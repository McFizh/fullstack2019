import React from 'react';

export const FilterValues = ({searchVal, searchValChange }) => {
  return(
    <>
    <span>Rajaa näytettäviä: </span>
    <input type="text" value={searchVal} onChange={searchValChange}></input>
    </>
  );
};