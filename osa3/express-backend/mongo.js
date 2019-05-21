const mongoose = require('mongoose');
const Person = require('./models/person');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Käyttöohje:');
  console.log(' Listaa tiedot: node mongo.db {salasana}');
  console.log('  Lisää numero: node mongo.db {salasana} {nimi} {numero}');
  process.exit(1);
}

const password = process.argv[2];

mongoose.connect(
  `mongodb+srv://fullstack:${password}@fullstack2019-zr6ag.mongodb.net/people?retryWrites=true`,
  { useNewUrlParser: true }
);

if (process.argv.length === 3) {
  console.log('Puhelinluettelo:');
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person
    .save()
    .then(() => {
      console.log(`Lisättiin ${person.name} ${person.number} luetteloon`);
      mongoose.connection.close();
    });
}

