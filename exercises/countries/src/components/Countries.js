const Country = ({ name }) => {
    return (
        <div>{name}</div>
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
            {countries.map(country => <Country key={country.id} name={country.name} />)}
        </div>
    );
};

export default Countries;