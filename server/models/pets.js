const { Schema, model } = require('mongoose');

const petSchema = new Schema({
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
});

const Pets = model('Pets', petSchema);

module.exports = Pets;
