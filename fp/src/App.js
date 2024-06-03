import './App.css';
import React, { useState } from 'react';

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
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (error) {
      setError('Error fetching weather data');
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Today's Weather</p>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={getWeather}>Get Weather</button>
        {error && <p>{error}</p>}
        {weather && (
          <div className='return'>
            {/* <p>City: {weather.name}</p> */}
            <p>It is currently <span>{weather.main.temp}°C</span> in {weather.name}</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
