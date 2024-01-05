const { Schema, model } = require('mongoose');

const replySchema = new Schema({
    message: {
        type: String,
        required: true,
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
});

const Replies = model('Replies', replySchema);

module.exports = Replies;
