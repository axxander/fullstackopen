import { useState } from 'react';
import CountryInformation from './CountryInformation';

const Country = ({ country }) => {

    const [show, setShow] = useState(false);

    const handleToggle = () => setShow(!show);

    return (
        <div>
            {country.name} <button onClick={handleToggle}>{show ? 'hide' : 'show'}</button>
            {show && <CountryInformation country={country} />}
        </div>
    );
};

const Countries = ({ countries }) => {

    if (countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        );
    }
    return (
        <div>
            {countries.map(country => <Country key={country.id} country={country} />)}
        </div>
    );
};

export default Countries;