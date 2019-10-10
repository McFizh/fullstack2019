import { gql } from 'apollo-boost';

export const ALL_AUTHORS = gql`
  {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author { name }
      genres
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query getAllBooks($genre: String)
  {
    allBooks(genre: $genre)  {
      title
      published
      author { name }
      genres
    }
  }
`;

export const ALL_GENRES = gql`{ allGenres }`;

export const ME = gql`{ me { favoriteGenre } }`;

export const CREATE_BOOK = gql`
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

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    setBornTo: $born
  ) {
    name
  }
}
`;

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
    value
  }
}
`;
