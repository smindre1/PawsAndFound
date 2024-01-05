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
    petId: {
        type: Schema.Types.ObjectId,
        ref: 'Pets'
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
