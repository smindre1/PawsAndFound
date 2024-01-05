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
    pet_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pet'
      }
});

const Post = model('Post', postSchema);

module.exports = Post;
