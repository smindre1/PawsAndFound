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
      if (context.user) {
        return User.find().populate("pets");
      }
      throw AuthenticationError;
    },
    posts: async () => {
        if (context.user) {
            return User.find().populate("posts");
        }
        throw AuthenticationError;
    },
    pet: async (parent, { petid }) => {
      return User.findOne({ petid }).populate("pets");
    },
    post: async (parent, { postid }) => {
      return User.findOne({ postid }).populate("posts");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
