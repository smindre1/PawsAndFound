const { Schema, model } = require('mongoose');

const shelterSchema = new Schema({
    petLists: [{
        type: Schema.Types.ObjectId,
        ref: 'Pet'
      }]
});

const Shelter = model('Shelter', shelterSchema);

module.exports = Shelter;