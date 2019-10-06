import React, { useState } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import BooksView from './views/books';
import AuthorsView from './views/authors';
import AddBookView from './views/addbook';
import LoginView from './views/login';

import Header from './components/header';
import Notification from './components/notification';

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
      genres
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

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`;


function App() {
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const [ authToken, setAuthToken ] = useState('');
  const [ message, setMessage ] = useState('');

  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_AUTHORS }, { query: ALL_BOOKS } ]
  });

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  const [ login ] = useMutation(LOGIN);

  const loginAction = async (username, password) => {
    try {
      const result = await login({
        variables: {
          username,
          password
        }
      });
      setAuthToken(result.data.login.value);
    } catch(err) {
      setMessage('Login failed');
    }
  }

  return (
    <Router>
      <Header authToken={authToken} setAuthToken={setAuthToken}/>
      <Notification message={message}/>
      <Route exact path="/" render={ () => <BooksView books={books}/> }/>
      <Route path="/authors" render={ () => <AuthorsView authors={authors} editAuthor={editAuthor} authToken={authToken}/> }/>
      <Route path="/addbook" render={ () => <AddBookView addBook={addBook}/> }/>
      <Route path="/login" render={ () => <LoginView login={loginAction} setMessage={setMessage}/> }/>
    </Router>
  );
}

export default App;
