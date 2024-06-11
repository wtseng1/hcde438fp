import './App.css';
import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    const apiKey = '902480971859b36b41507ae7e2389bc2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setError('');
        const docRef = doc(db, "weather", city);
        await setDoc(docRef, { data });
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (error) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getWeather();
    }
  };

  const capitalizeDescription = (description) => {
    return description
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter location"
          type="text"
        />
      </div>
      {error && <p>{error}</p>}
      {weather && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{weather.name}</p>
            </div>
            <div className="temp">
              <h1>{weather.main.temp}°C</h1>
            </div>
            <div className="description">
              <p>{capitalizeDescription(weather.weather[0].description)}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p className="bold">{weather.main.feels_like}°C</p>
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <p className="bold">{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className="bold">{weather.wind.speed} m/s</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
