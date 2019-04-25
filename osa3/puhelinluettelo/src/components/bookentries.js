import React from 'react';

export const BookEntries = ({data, deletePerson}) => {
  return(
    <>
    <h3>Numerot:</h3>
    {data.map( (entry) => <div key={entry.name}>
      <button onClick={ () => deletePerson(entry) }>Poista</button>
      {entry.name} ( {entry.number} )
    </div>  )}
    </>
  );
};