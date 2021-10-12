import { useState, useEffect } from 'react';
import axios from 'axios';

const Header = ({ capital }) => {
    return (
        <h2>Weather in {capital}</h2>
    );
};

const Temperature = ({ temperature }) => {
    return (
        <div>
            <b>temperature: </b> {temperature} Celcius
        </div>
    );
};

const Wind = ({ wind, direction }) => {
    return (
        <div>
            <b>wind: </b> {wind} kmph direction {direction}
        </div>
    );
};

const Icon = ({ icon }) => {
    return (
        <img src={icon} alt="weather icon" style={{ width: 100, height: 100 }} />
    );
};

const Weather = ({ country }) => {
    const capital = country.capital[0]; // todo: handle empty list case
    const [weather, setWeather] = useState({
        temperature: null,
        icon: null,
        wind: null,
        direction: null,
    });

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`)
            .then(response => {
                const data = response.data.current;
                setWeather({
                    temperature: data.temperature,
                    icon: data.weather_icons[0],
                    wind: data.wind_speed,
                    direction: data.wind_dir,
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, [capital]);

    return (
        <div>
            <Header capital={capital} />
            <Temperature temperature={weather.temperature} />
            <Icon icon={weather.icon} />
            <Wind wind={weather.wind} direction={weather.direction} />
        </div>
    );
};

export default Weather;