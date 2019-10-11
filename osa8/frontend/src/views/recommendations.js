import React from 'react';

const Recommendations = ({ books, favGenre, genres, setFavoriteGenre }) => {
  if(genres.loading) {
    return <div>Loading...</div>;
  }

  const genreText = favGenre === '' ? null : <p>books in your favorite genre <b>{favGenre}</b></p>;

  const changeFavGenre = (e, genre) => {
    e.preventDefault();
    if(genre === favGenre) {
      return;
    }
    setFavoriteGenre(genre);
  };

  return <div>
    <h1>Recommendations</h1>
    {genreText}
    <table>
      <thead><tr>
        <td></td>
        <td>Author</td>
        <td>Published</td>
        </tr></thead>
      <tbody>
        { books.map( (book) => <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr> ) }
      </tbody>
    </table>
    <br/>
    <h3>Set favorite genre:</h3>
    { genres.data.allGenres.map( (genre) =>
      <div
        key={genre}
        className={ genre === favGenre ? "genreSelector selected":"genreSelector"}
        onClick={ (e) => changeFavGenre(e,genre) }
        >{genre}</div>
    ) }

  </div>;
}

export default Recommendations;