const Mongoose = require('mongoose');
var UniqueValidator = require('mongoose-unique-validator');

const peopleSchema = new Mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
});
peopleSchema.plugin(UniqueValidator);

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = Mongoose.model('People', peopleSchema);