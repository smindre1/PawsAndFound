const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    pet: {
        type: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        img:  {
            type: String,
            required: true,
        },
        lastSeen: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            required: true,
        },
      },
    replies: [{
        message: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
      }]
});

const Post = model('Post', postSchema);

module.exports = Post;
