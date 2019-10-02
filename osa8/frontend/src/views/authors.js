import React, { useState } from 'react';

import Select from 'react-select';

import { useField } from '../hooks';


const AuthorsView = ({ authors, editAuthor }) => {
  const [ selectedAuthor, setSelectedAuthor ] = useState(null);
  const [ year, resetYear ] = useField('text');

  if(authors.loading) {
    return <div>Loading...</div>
  }

  const authorOptions = authors
    .data
    .allAuthors
    .map( (author) => ({ value: author.name , label: author.name }));

  const authorChanged = (selectedOption) => {
    setSelectedAuthor(selectedOption);
  }

  const changeYear = async (e) => {
    e.preventDefault();
    await editAuthor({
      variables: {
        name: selectedAuthor.value,
        born: parseInt(year.value)
      }
    });
    resetYear();
  }

  return <div>
    <h1>Authors</h1>
    <table>
      <thead><tr>
        <td></td>
        <td>Born</td>
        <td>Books</td>
        </tr></thead>
      <tbody>
        { authors.data.allAuthors.map( (author) => <tr key={author.name}>
          <td>{author.name}</td>
          <td>{author.born}</td>
          <td>{author.bookCount}</td>
        </tr> ) }
      </tbody>
    </table>
    <h1>Set birthyear</h1>
    <div>
      <Select options={authorOptions} value={selectedAuthor} onChange={authorChanged}/>
      <label>Born</label>
      <input {...year}/><br/>
      <button type="button" onClick={changeYear}>Update author</button>
    </div>
  </div>;
}

export default AuthorsView;