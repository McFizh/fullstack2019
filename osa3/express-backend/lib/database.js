const Mongoose = require('mongoose');
const Person = require('../models/person');

function connect(dbUrl) {
  Mongoose
    .connect(dbUrl, { useNewUrlParser: true })
    .then(res => {
      console.log('>> Connected to MongoDB');
    })
    .catch(err => {
      console.log('>> Error connecting to MongoDB:', err.message);
      process.exit(-1);
    });
}

async function getPersons() {
  return await Person.find({});
}

async function getPersonById(id) {
  return await Person.find({ _id: id });
}

async function getPersonByName(name) {
  return await Person.find({ name });
}

async function newPerson(name, number) {
  const person = new Person({
    name,
    number
  });

  return await person.save();
}

async function updatePerson(name, number) {

}

async function removePerson(id) {

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