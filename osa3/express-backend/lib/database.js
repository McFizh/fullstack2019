const Mongoose = require('mongoose');
const Person = require('../models/person');

function connect(dbUrl) {
  Mongoose
    .connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
      console.log('>> Connected to MongoDB');
    })
    .catch(err => {
      console.log('>> Error connecting to MongoDB:', err.message);
      process.exit(-1);
    });
}

function getPersons() {
  return Person.find({});
}

function getPersonById(id) {
  return Person.findOne({ _id: id });
}

function getPersonByName(name) {
  return Person.findOne({ name });
}

function newPerson(name, number) {
  const person = new Person({
    name,
    number
  });

  return person.save();
}

function updatePerson(name, number, person) {
  person.name = name;
  person.number = number;
  return person.save();
}

function removePerson(id) {
  return Person.deleteOne({ _id: id });
}

module.exports = {
  connect,
  getPersons,
  getPersonById,
  getPersonByName,
  newPerson,
  updatePerson,
  removePerson
};