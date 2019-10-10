import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/react-hooks';

import BooksView from './views/books';
import AuthorsView from './views/authors';
import AddBookView from './views/addbook';
import LoginView from './views/login';
import Recommendations from './views/recommendations';

import Header from './components/header';
import Notification from './components/notification';

import {
  ALL_AUTHORS, ALL_GENRES, CREATE_BOOK, ME, EDIT_AUTHOR,
  GET_ALL_BOOKS, BOOK_ADDED
} from './graphql/queries';

function App() {
  const [ authToken, setAuthToken ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ selectedGenre, setSelectedGenre ] = useState('');
  const [ books, setBooks ] = useState([]);
  const [ recBooks, setRecBooks ] = useState([]);
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const genres = useQuery(ALL_GENRES);
  const profile = useQuery(ME);

  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS }, { query: ALL_GENRES }
    ],
    update: () => {
      getBooks(false, selectedGenre);
    }
  });

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
    }
  });

  const getBooks = async (useCache = true, genre) => {
    const { data } = await client.query({
      query: GET_ALL_BOOKS,
      variables: { genre },
      fetchPolicy: useCache ? 'cache-first' : 'no-cache'
    });
    setBooks(data.allBooks);
  }

  useEffect( () => {
    const token = localStorage.getItem('user-token');

    if(token && token !== '') {
      setAuthToken(token);
    }
  }, []);

  useEffect( () => {
    getBooks(true, selectedGenre);
  }, [selectedGenre])

  const setGenre = (e, genre) => {
    e.preventDefault();
    setSelectedGenre(genre === selectedGenre ? '' : genre);
  }

  return (
    <Router>
      <Header authToken={authToken} setAuthToken={setAuthToken}/>
      <Notification message={message}/>
      <Route exact path="/" render={ () => <BooksView books={books} genres={genres} setGenre={setGenre} selectedGenre={selectedGenre} /> }/>
      <Route path="/authors" render={ () => <AuthorsView authors={authors} editAuthor={editAuthor} authToken={authToken}/> }/>
      <Route path="/recommendations" render={ () => <Recommendations profile={profile} genres={genres} books={recBooks}/> }/>
      <Route path="/addbook" render={ () => <AddBookView addBook={addBook}/> }/>
      <Route path="/login" render={ () => <LoginView setAuthToken={setAuthToken} setMessage={setMessage}/> }/>
    </Router>
  );
}

export default App;
