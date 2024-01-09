const { User, Pets, Post } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("posts");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts");
      }
      throw AuthenticationError;
    },
    pets: async () => {
      return Pets.find();
    },
    posts: async () => {
      return Post.find();
    },
    pet: async (parent, { petId }) => {
      return Pets.findOne({ petId });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ postId });
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
    addPost: async (parent, { location, type, name, img, lastseen }, context) => {
      if (context.user) {
        const pet = await Pets.create({
          type,
          name,
          img,
          lastseen,
        });
        const post = await Post.create({
          username: context.user.username,
          location,
          pet,
        });

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

        await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { posts: post._id } });

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
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
