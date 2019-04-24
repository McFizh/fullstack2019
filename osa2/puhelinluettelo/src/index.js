import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BookEntries } from './components/bookentries';
import { FilterValues } from './components/filtervalues';
import { NewEntry } from './components/newentry';
import { Notification } from './components/notification';

import Persons from './services/persons';

import './index.css';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchVal, setNewSearchVal] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    Persons
      .getAll()
      .then(pdata => setPersons(pdata));
  }, []);

  const searchValChange = e => {
    setNewSearchVal(e.target.value);
  }

  const newNameChange = e => {
    setNewName(e.target.value);
  }

  const newNumChange = e => {
    setNewNum(e.target.value);
  }

  const deletePerson = person => {
    const repl = window.confirm(`Poistetaanko ${person.name}?`);
    if (!repl) {
      return;
    }

    Persons
      .deletePerson(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
        setNotification({
          msg: `Poistettiin henkilön ${person.name} tiedot`,
          type: 'success'
        });
        setTimeout(() => { setNotification(null) }, 3000);
      })
      .catch(err => {
        setNotification({
          msg: `Henkilön ${person.name} tietojen poisto epäonnistui`,
          type: 'error'
        });
        setTimeout(() => { setNotification(null) }, 3000);
      });
  }

  const addNewClick = e => {
    e.preventDefault();

    const person = persons.find((person) => person.name === newName);
    if (person) {
      const repl = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`);
      if (repl) {
        person.number = newNum;
        Persons
          .update(person)
          .then(updPerson => {
            setPersons(persons.map(p => p.id !== updPerson.id ? p : updPerson));
            setNewName('');
            setNewNum('');
            setNotification({
              msg: `Päivitettiin henkilön ${person.name} tiedot`,
              type: 'success'
            });
            setTimeout(() => { setNotification(null) }, 3000);
          })
          .catch(err => {
            setNotification({
              msg: `Henkilön ${person.name} tietojen päivitys epäonnistui`,
              type: 'error'
            });
            setTimeout(() => { setNotification(null) }, 3000);
          });
      }
      return;
    }

    Persons
      .create({ name: newName, number: newNum })
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNum('');
        setNotification({
          msg: `Lisättiin ${newPerson.name}`,
          type: 'success'
        });
        setTimeout(() => { setNotification(null) }, 3000);
      });
  }

  const filteredPersons = persons.filter((person) => {
    return searchVal.length === 0 || person.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase());
  });

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification note={notification} />
      <FilterValues searchVal={searchVal} searchValChange={searchValChange} />
      <NewEntry newName={newName} newNum={newNum}
        newNameChange={newNameChange}
        newNumChange={newNumChange}
        addNewClick={addNewClick} />
      <BookEntries data={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
