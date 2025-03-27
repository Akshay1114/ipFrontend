import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './WeatherCard.css';

function WeatherCard() {
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  useEffect(() => {
    getLocation();
  }, []);

  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const WeekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeatherByLocation, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByLocation = async (position) => {
    const { latitude, longitude } = position.coords;
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
    await axios.get(url, {
      params: {
        lat: latitude,
        lon: longitude,
        units: 'metric',
        appid: api_key,
      },
    })
    .then((res) => {
      setWeather({ data: res.data, loading: false, error: false });
    })
    .catch((error) => {
      setWeather({ ...weather, data: {}, error: true });
    });
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  return (
    <div className="weather-card cardUp">
      {weather.loading && (
        <Oval type="Oval" color="black" height={100} width={100} />
      )}
      {weather.error && (
        <span className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: '20px' }}>City not found</span>
        </span>
      )}
      {weather && weather.data && weather.data.main && (
        <>
          <div className='WeatherC-1'>
              <div className="city-name">
                <h2>
                  {weather.data.name}, <span>{weather.data.sys.country}</span>
                </h2>
              </div>
              <div className="icon-temp">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                  alt={weather.data.weather[0].description}
                />
                {Math.round(weather.data.main.temp)}
                <sup className="deg">°C</sup>
              </div>
          </div>
          <div className='WeatherC-2'>  
              <div className="date">
                <span>{toDateFunction()}</span>
              </div>
              <div className="des-wind">
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.data.wind.speed}m/s</p>
              </div>
          </div>
          
        </>
      )}
    </div>
  );
}

export default WeatherCard;