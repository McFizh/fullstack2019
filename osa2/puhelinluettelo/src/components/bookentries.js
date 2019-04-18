import React from 'react';

export const BookEntries = ({data}) => {
  return(
    <>
    <h3>Numerot:</h3>
    {data.map( (entry) => <div key={entry.name}>
      <button>Poista</button>
      {entry.name} ( {entry.number} )
    </div>  )}
    </>
  );
};