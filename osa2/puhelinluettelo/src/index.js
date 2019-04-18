import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BookEntries } from './components/bookentries';
import { FilterValues } from './components/filtervalues';
import { NewEntry } from './components/newentry';

import Persons from './services/persons';



const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [searchVal, setNewSearchVal] = useState('');

  useEffect( () => {
    Persons
      .getAll()
      .then( pdata => setPersons(pdata) );
  }, []);

  const searchValChange = (e) => {
    setNewSearchVal(e.target.value);
  }

  const newNameChange = (e) => {
    setNewName(e.target.value);
  }

  const newNumChange = (e) => {
    setNewNum(e.target.value);
  }

  const addNewClick = (e) => {
    e.preventDefault();

    const isNameFree = persons.every( (person) => person.name !== newName );
    if(!isNameFree) {
      alert(`${newName} on jo luettelossa`);
      return;
    }

    const newPerson = {name: newName, number: newNum };

    Persons
      .create(newPerson)
      .then( () => {
        setPersons( persons.concat(newPerson) );
        setNewName('');
        setNewNum('');
      } )
  }

  const filteredPersons = persons.filter( (person) => {
    return searchVal.length === 0 || person.name.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase());
  } );

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <FilterValues searchVal={searchVal} searchValChange={ searchValChange }/>
      <NewEntry newName={newName} newNum={newNum}
        newNameChange={newNameChange}
        newNumChange={newNumChange}
        addNewClick={addNewClick}/>
      <BookEntries data={filteredPersons}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
