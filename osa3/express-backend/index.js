const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./lib/database');

const app = express();

require('dotenv').config();

// Luodaan yhteys tietokantaan
const dburl = process.env.DB_URL;
const PORT = process.env.PORT;

if(!dburl) {
  console.log('Missing database url, please set it in .env file');
  process.exit(-1);
}

db.connect(dburl);

// Express middlewaret
morgan.token('post-data', (req, res) => JSON.stringify(req.body) );

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

// Express reitit
app.get('/api/persons', async (req, res, next) => {
  const persons = await db.getPersons();
  res.json(persons);
});

app.post('/api/persons', async (req, res, next) => {
  const name = req.body.name;
  const number = req.body.number;

  if(!name || name.length===0) {
    res.status(400).json({ error: 'Name is mandatory' });
    return;
  }

  if(!number || number.length===0) {
    res.status(400).json({ error: 'Number is mandatory' });
    return;
  }

  const person = await db.getPersonByName(name);
  if( person ) {
    res.status(409).json({ error: 'Name already in phonebook' });
    return;
  }

  const newPerson = await db.newPerson(name, number);
  res.json(newPerson);
});

app.get('/api/persons/:id', async (req, res, next) => {
  const person = await db.getPersonById(req.params.id);
  if(person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  const person = await db.getPersonById(req.params.id);
  if(person) {
    db.removePerson(req.params.id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get('/info', async (req, res, next) => {
  const persons = await db.getPersons();

  let output = `Puhelinluettelossa ${persons.length} henkilön tiedot<br/><br/>`;
  output += `${new Date()}<br/>`;
  res.send(output);
});

app.listen(PORT, () => {
  console.log(`>> Server running on port ${PORT}`);
});