import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=cc5c35c597c09c4bd115a5466c75fc5e`;

  const searchLocation = async () => {
    try {
      await axios.get(url).then((response) => {
        setData(response.data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
    setLocation("");
  };

  return (
    <section className="App">
      <div className="header">
        <h1>Weather App</h1>
        <form className="searchContainer">
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter your city here..."
          />
          <button type="button" onClick={searchLocation}>
            Search
          </button>
        </form>
      </div>
      <div className="cityName">
        <h1>{data.name}</h1>
      </div>
      <div className="tempDiv">
        {data.main ? (
          <p className="temperature">{data.main.temp.toFixed()}⁰C</p>
        ) : null}
      </div>
      <div className="desDiv">
        {data.weather ? (
          <p className="description">{data.weather[0].main}</p>
        ) : null}
      </div>
      <section className="bootom-container">
        <div className="moreInfoDiv">
          <div className="feelsLikeDiv">
            {data.main ? (
              <>
                <h4>Feels like:</h4>
                <p className="feels-like">{data.main.feels_like.toFixed()}⁰C</p>
              </>
            ) : null}
          </div>
          <div className="humidityDiv">
            {data.main ? (
              <>
                <h4>Humidity:</h4>
                <p className="humidity">{data.main.humidity}%</p>
              </>
            ) : null}
          </div>
          <div className="windDiv">
            {data.wind ? (
              <>
                <h4>Wind speed:</h4>
                <p className="wind">{data.wind.speed} km/h</p>
              </>
            ) : null}
          </div>
        </div>
      </section>
    </section>
  );
}

export default App;
