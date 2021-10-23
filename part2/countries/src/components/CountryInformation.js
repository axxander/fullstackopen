const Languages = ({ languages }) => {
    return (
        <div>
            <h2>Languages</h2>
            <ul>
                {languages.map(language => <li key={language}>{language}</li>)}
            </ul>
        </div>
    );
};

const Information = ({ capital, population }) => {
    return (
        <div>
            <div>capital {capital}</div>
            <div>population {population}</div>
        </div>
    );
};

const CountryInformation = ({ country }) => {

    const capital = country.capital.length !== 0 ? country.capital[0] : null;
    const population = country.population;
    const languages = Object.keys(country.languages) !== 0 ? Object.keys(country.languages).map(key => country.languages[key]) : [];
    const flag = country.flags.length !== 0 ? country.flags[0] : '';

    return (
        <div>
            <h1>{country.name}</h1>
            <Information capital={capital} population={population} />
            <Languages languages={languages} />
            <img src={flag} alt="flag" style={{ width: 300, height: 200 }} />
        </div>
    );
};

export default CountryInformation;