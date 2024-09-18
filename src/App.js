import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "e0aab23400ad92284116af3e4ff1d26a"; 

  const fetchWeatherData= async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch weather data. Please try again later.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  },[]);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "/sun.webp"; 
      case "Rain":
        return "/thunder.webp"; 
      case "Snow":
        return "/rain_with_colud.webp"; 
      case "Haze":
        return "/Tornado.webp"; 
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {error && <p className="error">{error}</p>}
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="container_degree">{weatherData.main.temp}°C</h2>
              <h2 className="country_per">
                {weatherData.weather[0].main}
                <span className="degree_icon"></span>
              </h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">click</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;