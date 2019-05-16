const Mongoose = require('mongoose');

const peopleSchema = new Mongoose.Schema({
  name: String,
  number: String
});

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = Mongoose.model('People', peopleSchema);