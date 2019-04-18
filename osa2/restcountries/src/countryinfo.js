import React, { useEffect, useState } from 'react';
import Axios from 'axios';

export const CountryInfo = ({country}) => {
  // Yep, api key is here.. go nuts, my fake account doesn't care :)
  const aKey = 'b46c817c7b464346b4b83742191804';

  const [ weather, setWeather ] = useState(null);

  useEffect( () => {
    Axios.get(`https://api.apixu.com/v1/current.json?key=${aKey}&q=${country.capital}`)
    .then( (resp) => {
      setWeather(resp.data.current);
    });
  }, []);

  let weatherInfo=<div>Loading...</div>;

  if(weather) {
    weatherInfo = <>
      <div><b>Temperature:</b> {weather.temp_c} Celcius </div>
      <div><img alt="weather" src={weather.condition.icon}/></div>
      <div><b>wind:</b> {weather.wind_kph} KPH direction {weather.wind_dir}</div>
    </>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <div><b>Capital:</b> {country.capital}</div>
      <div><b>Population:</b> {country.population}</div>
      <h2>Languages:</h2>
      <ul>
      {country.languages.map( lang => <li key={lang.name}>{lang.name}</li> )}
      </ul>
      <img src={country.flag} alt="Flag" className="countryFlag"/>
      <h2>Weather in {country.capital}:</h2>
      {weatherInfo}
    </div>
  );
};
