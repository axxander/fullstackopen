import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Countries from './components/Countries';


const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3/all")
      .then(response => {
        return response.data.map(country => ({ name: country.name.common, id: country.ccn3 }));
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
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
