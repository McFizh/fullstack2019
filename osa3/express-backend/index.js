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
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

morgan.token('post-data', req => JSON.stringify(req.body) );
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

// Express reitit
app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await db.getPersons();
    res.json(persons);
  } catch(err) {
    next(err);
  }
});

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await db.getPersonById(req.params.id);
    if( person ) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  } catch(err) {
    next(err);
  }
});

app.post('/api/persons', async (req, res, next) => {
  try {
    const newPerson = await db.newPerson(req.body.name, req.body.number);
    res.json(newPerson);
  } catch(err) {
    next(err);
  }
});

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await db.getPersonById(req.params.id);
    if( !person ) {
      res.status(404).json({ error: 'Name not in phonebook' });
      return;
    }

    const updPerson = await db.updatePerson(req.body.name, req.body.number, person);
    res.json(updPerson);
  } catch(err) {
    next(err);
  }
});

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await db.getPersonById(req.params.id);
    if( !person ) {
      res.status(404).json({ error: 'Name not in phonebook' });
      return;
    }

    await db.removePerson(req.params.id);
    res.status(204).end();
  } catch(err) {
    next(err);
  }
});

app.get('/info', async (req, res, next) => {
  try {
    const persons = await db.getPersons();
    let output = `Puhelinluettelossa ${persons.length} henkilön tiedot<br/><br/>`;
    output += `${new Date()}<br/>`;
    res.send(output);
  } catch(err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`>> Server running on port ${PORT}`);
});

// 404 handler
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// Virhekäsittelijä
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if(err.name === 'ValidationError' ) {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};
app.use(errorHandler);

