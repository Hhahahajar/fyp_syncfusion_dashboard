/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'VKKuuusDYnC02idiM3TUXQNvtY3Xwf25'; // Your API Key
  const LOCATION = '42.3478,-71.0466'; // Replace with the desired location (latitude, longitude)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.tomorrow.io/v4/weather/forecast', {
          params: {
            location: LOCATION,
            apikey: API_KEY,
          }
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather forecast data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <h1 className="text-2xl font-bold">Weather Forecast</h1>
      {weatherData ? (
        <pre>{JSON.stringify(weatherData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherForecast;
