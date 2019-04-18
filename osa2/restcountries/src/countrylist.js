import React from 'react';
import { CountryInfo } from './countryinfo';

export const CountryList = ({countries, selectCountry}) => {
  if(countries.length>10) {
    return (
      <div>Too many matches ({countries.length}), specify another filter</div>
    )
  }

  if(countries.length===1) {
    return (
      <CountryInfo country={countries[0]}/>
    )
  }

  return(
    <>
    {countries.map(country =>
      <div key={country.name}>
        <button onClick={ () => selectCountry(country.name) }>show</button>
        {country.name}
      </div>
    )}
    </>
  )
};