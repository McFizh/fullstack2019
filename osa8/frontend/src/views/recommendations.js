import React from 'react';

const Recommendations = ({ profile, genres }) => {
  if(profile.loading || genres.loading) {
    return <div>Loading...</div>;
  }

  const favGenre = profile.data.me.favoriteGenre;
  const genreText = favGenre === '' ? null : <p>books in your favorite genre <b>{favGenre}</b></p>;

  return <div>
    <h1>Recommendations</h1>
    {genreText}
    <br/>
    <h3>Set favorite genre:</h3>
    { genres.data.allGenres.map( (genre) =>
      <div
        key={genre}
        className={ genre === favGenre ? "genreSelector selected":"genreSelector"}
        >{genre}</div>
    ) }

  </div>;
}

export default Recommendations;