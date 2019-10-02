import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

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
      author { name }
    }
  }
`;

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
  }
}
`;

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    setBornTo: $born
  ) {
    name
  }
}
`;

function App() {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  });

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  return (
    <Router>
      <Header/>
      <Route exact path="/" render={ () => <BooksView books={books}/> }/>
      <Route path="/authors" render={ () => <AuthorsView authors={authors} editAuthor={editAuthor}/> }/>
      <Route path="/addbook" render={ () => <AddBookView addBook={addBook}/> }/>
    </Router>
  );
}

export default App;
