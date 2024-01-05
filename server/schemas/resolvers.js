const {User, Pets, Post } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('posts');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('posts');
        },
        me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id }).populate('posts');
        }
        throw AuthenticationError;
        },
        pets: async () => {
            return User.find().populate('pets');
        },
        posts: async () => {
            return User.find().populate('posts');
        },
        pet: async (parent, { petid }) => {
            return User.findOne({ petid }).populate('pets');
        },
        post: async (parent, { postid }) => {
            return User.findOne({ postid }).populate('posts');
        },


    },

    Mutation: {

    },
}

module.exports = resolvers;
