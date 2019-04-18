import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { SearchComponent } from './searchcomponent';
import { CountryList } from './countrylist';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ searchVal, setSearchVal ] = useState('');

  useEffect( () => {
    Axios.get('https://restcountries.eu/rest/v2/all')
    .then( (resp) => {
      setCountries(resp.data);
    });
  }, []);

  const searchValChange = (e) => {
    setSearchVal(e.target.value);
  }

  const selectCountry = (country) => {
    setSearchVal(country);
  }

  const filteredCountries = countries.filter( (country) => {
    return searchVal.length > 0 && country.name.toLocaleLowerCase().includes( searchVal.toLocaleLowerCase() );
  } )

  return (
    <div>
      <SearchComponent searchVal={searchVal} searchValChange={searchValChange}/>
      <CountryList countries={filteredCountries} selectCountry={selectCountry}/>
    </div>
  )
}

export default App;
