import "./App.css";
import Currentweather from "./components/current-weather/Current-weather";
import Search from "./components/search/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState, useEffect } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    currentlocation();
  }, []);

  const handleOnSearchChange = (data) => {
    const [lat, long] = data.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: data.label, ...weatherResponse });
        setForecast({ city: data.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  const currentlocation = async () => {
    let loc = await fetch("https://ipinfo.io/json?token=1ad76766a3787e")
    .then(response => response.json());
    
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${loc.loc.split(",")[0]}&lon=${loc.loc.split(",")[0]}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${loc.loc.split(",")[0]}&lon=${loc.loc.split(",")[0]}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: loc.city, ...weatherResponse });
        setForecast({ city: loc.city, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <Currentweather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
