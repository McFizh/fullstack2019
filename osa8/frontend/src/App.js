import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks';

import BooksView from './views/books';
import AuthorsView from './views/authors';
import AddBookView from './views/addbook';

import Header from './components/header';

const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  {
    allBooks  {
      title
      published
      author
    }
  }
`;


function App() {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  return (
    <Router>
      <Header/>
      <Route exact path="/" render={ () => <BooksView books={books}/> }/>
      <Route path="/authors" render={ () => <AuthorsView authors={authors}/> }/>
      <Route path="/addbook" render={ () => <AddBookView/> }/>
    </Router>
  );
}

export default App;
