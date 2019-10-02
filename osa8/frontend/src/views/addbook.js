import React, { useState } from 'react';

import { useField } from '../hooks';

const AddBookView = (props) => {
  const [ title, resetTitle ] = useField('text');
  const [ genre, resetGenre ] = useField('text');
  const [ author, resetAuthor ] = useField('text');
  const [ published, resetPublished ] = useField('text');

  const [ genres, setGenres ] = useState([]);

  const addGenre = (e) => {
    e.preventDefault();
    const gval = genre.value;
    if(gval.length > 0 && !genres.includes(gval) ) {
      setGenres( genres.concat(gval) );
      resetGenre();
    }
  }

  const createBook = async (e) => {
    e.preventDefault();

    await props.addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: parseInt(published.value),
        genres
      }
    });

    resetTitle();
    resetPublished();
    resetAuthor();
    setGenres([]);
  }

  return (<div>
    <h1>Add book</h1>
    <form>
      <label>Title:</label>
      <input {...title}/><br/>

      <label>Author:</label>
      <input {...author}/><br/>

      <label>Published:</label>
      <input {...published}/><br/>

      <label>Genres:</label><br/>
      { genres.map( (genre) => <span key={genre}>{genre}</span> )}
      <br/>
      <input {...genre}/> <button type="button" onClick={addGenre}>Add genre</button>
      <br/>
      <button type="button" onClick={createBook}>Create book</button>
    </form>
  </div>);
}

export default AddBookView;

