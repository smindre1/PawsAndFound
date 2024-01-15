const { User, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw AuthenticationError;
    },
    posts: async () => {
      return Post.find();
    },
    foundPets: async () => {
      return Post.find({"pet.type": "found"});
    },
    lostPets: async () => {
      return Post.find({"pet.type": "lost"});
    },
    post: async (parent, { postId }) => {
      return Post.findById( postId );
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, { message, location, pet }, context) => {
      if (context.user) {
        // console.log("the message: ", message);
        // console.log("Resolvers", "type: ", pet.type, "name: ", pet.name, "img: ", pet.img, "lastSeen: ", pet.lastSeen, "species: ", pet.species);

        const post = await Post.create({
          username: context.user.username,
          message,
          location,
          pet: {type: pet.type,
          name: pet.name,
          img: pet.img,
          lastSeen: pet.lastSeen,
          species: pet.species}}
        );

        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { post: post._id } });

        return post;
      }
      throw AuthenticationError("You need to be logged in!");
    },
    delPost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          username: context.user.username,
        });

        await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { posts: post._id } }); //If this doesn't work you can use the arg

        return post;
      }
      throw AuthenticationError;
    },
    addReply: async (parent, { postId, message }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              replies: { message, username: context.user.username },
            },
          },
          {
            new: true,
          }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
