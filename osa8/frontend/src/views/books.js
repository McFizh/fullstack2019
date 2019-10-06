import React from 'react';

const BooksView = ({ books }) => {
  if(books.loading) {
    return <div>Loading...</div>
  }

  const tGenres = books.data.allBooks
    .map( (book) => book.genres)
    .flat();
  const genres = tGenres.filter( (item, index) => tGenres.indexOf(item) === index );

  return <div>
    <h1>Books</h1>
    <table>
      <thead><tr>
        <td></td>
        <td>Author</td>
        <td>Published</td>
        </tr></thead>
      <tbody>
        { books.data.allBooks.map( (book) => <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr> ) }
      </tbody>
    </table>
    <br/>
    { genres.map( (genre) => <div key={genre} className="genreSelector">{genre}</div> ) }
  </div>;
}

export default BooksView;