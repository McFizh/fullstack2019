import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import BooksView from './views/books';
import AuthorsView from './views/authors';
import AddBookView from './views/addbook';

import Header from './components/header';

function App() {
  return (
    <Router>
      <Header/>
      <Route exact path="/" render={ () => <BooksView/> }/>
      <Route path="/authors" render={ () => <AuthorsView/> }/>
      <Route path="/addbook" render={ () => <AddBookView/> }/>
    </Router>
  );
}

export default App;
