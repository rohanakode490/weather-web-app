import "./App.css";
import Currentweather from "./components/current-weather/Current-weather";
import Search from './components/search/Search'
import {WEATHER_API_URL, WEATHER_API_KEY} from './api'
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange =(data)=>{
    const [lat, long] = data.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) =>{
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: data.label, ...weatherResponse});
        setForecast({city: data.label, ...forecastResponse});
      })
      .catch((err)=> console.log(err));
  }

  console.log(currentWeather);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <Currentweather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
