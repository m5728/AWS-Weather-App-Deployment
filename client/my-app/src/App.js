import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/getWeather', { lat, long });
      setWeather(response.data);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Latitude:
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Longitude:
              <input
                type="text"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Get Weather</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && (
          <div>
            <h2>Weather Data</h2>
            <h3>{weather.weather_overview}</h3>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
