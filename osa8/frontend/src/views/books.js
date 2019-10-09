import React from 'react';

const BooksView = ({ books, genres, selectedGenre, setGenre }) => {
  if(books.loading || genres.loading) {
    return <div>Loading...</div>
  }

  const genreText = selectedGenre === '' ? null : <p>in genre {selectedGenre}</p>;

  return <div>
    <h1>Books</h1>
    {genreText}
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
    { genres.data.allGenres.map( (genre) =>
      <div
        key={genre}
        className={ genre === selectedGenre ? "genreSelector selected":"genreSelector"}
        onClick={ (e) => setGenre(e,genre) }
        >{genre}</div>
    ) }
  </div>;
}

export default BooksView;