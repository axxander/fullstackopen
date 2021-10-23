import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';
import CountryInformation from './components/CountryInformation';
import Weather from './components/Weather';


const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3/all")
      .then(response => {
        return response.data.map(country => {
          const countryObject = {
            name: country.name.common,
            id: country.ccn3,
            population: country.population,
            capital: country.capital,
            flags: country.flags,
            languages: country.languages
          };
          return countryObject;
        });
      })
      .then(countries => {
        setCountries(countries);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries === undefined ? [] : countries.filter(country => {
    return country.name.toLowerCase().includes(filter.toLowerCase()) === true;
  });

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      {filteredCountries.length > 1 && filteredCountries.length !== 0 && <Countries countries={filteredCountries} />}
      {filteredCountries.length === 1 && <CountryInformation country={filteredCountries[0]} />}
      {filteredCountries.length === 1 && <Weather country={filteredCountries[0]} />}
    </div>
  );
};

export default App;
