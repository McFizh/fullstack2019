const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  }, {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  }, {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  }, {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  }
];

function generateId() {
  return Math.floor(Math.random()*10000000);
}

morgan.token('post-data', (req, res) => JSON.stringify(req.body) );

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));
app.use(bodyParser.json());
app.use(express.static('build'));
app.use(cors());

app.get('/api/persons', (req, res) => {
  res.json(persons)
});

app.post('/api/persons', (req, res) => {
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

  if( persons.find( p => p.name === name ) ) {
    res.status(409).json({ error: 'Name already in phonebook' });
    return;
  }

  const id = generateId();
  const person = { name, number, id };
  persons.push(person);

  res.json(person);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find( p => p.id === id );
  if(person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find( p => p.id === id );
  if(person) {
    persons = persons.filter( p => p.id !== id );
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  let output = `Puhelinluettelossa ${persons.length} henkilön tiedot<br/><br/>`;
  output += `${new Date()}<br/>`;
  res.send(output);
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});