import React from 'react';

export const SearchComponent = ({searchVal, searchValChange}) => {
  return (
    <div>
      Find countries: <input type="text" value={searchVal} onChange={searchValChange}/>
    </div>
  )
}