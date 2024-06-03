import React, { useEffect, useState } from "react";
import "./weatherapp.css";
import axios from "axios";

export default function Weatherapp() {
  const [city, setCity] = useState("");
  const [weatherData, setweatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const handlecitychange = (e) => {
    const selectedcity = e.target.value;

    setCity(selectedcity);
  };
  const fetchapi = async (city) => {
    try {
      setLoading(true);
      const apikey = "ea61de2c8a2c4828ac250614242802";
      const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;
      const response = await axios.get(url);
      setweatherData(response.data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handlesubmit = () => {
    fetchapi(city);
    // console.log(weatherData);
  };

  useEffect(() => {
    if (weatherData) {
      console.log(weatherData);
    }
  }, [weatherData]);

  return (
    <div className="wrapperdiv">
      <div className="searchbardiv">
        <input type="text" onChange={handlecitychange} value={city} />
        <button onClick={handlesubmit}>Search</button>
      </div>
      {loading ? (
        <p className="loading">Loading data...</p>
      ) : weatherData ? (
        <div className="weather-cards">
          <div className="weather-card">
            <h5>Temperature</h5>
            <span>{weatherData.current.temp_c}°C</span>
          </div>
          <div className="weather-card">
            <h5>Humidity</h5>
            <span>{weatherData.current.humidity}%</span>
          </div>
          <div className="weather-card">
            <h5>Condition</h5>
            <span>{weatherData.current.condition.text}</span>
          </div>
          <div className="weather-card">
            <h5>Wind Speed</h5>
            <span>{weatherData.current.wind_kph}kph</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
