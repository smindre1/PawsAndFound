const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    postId: {
        type: ObjectId,
        required: true,
    },
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
        ref: 'Pet'
      },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Replies'
      }]
});

const Post = model('Post', postSchema);

module.exports = Post;
