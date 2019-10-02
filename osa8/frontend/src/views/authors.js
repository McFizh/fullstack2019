import React from 'react';


const AuthorsView = ({ authors }) => {
  if(authors.loading) {
    return <div>Loading...</div>
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
  </div>;
}

export default AuthorsView;