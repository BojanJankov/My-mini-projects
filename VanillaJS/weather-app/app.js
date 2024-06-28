console.log("App script is working");

const weatherApp = () => {
  // Selectors

  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector(".searchButton");
  const cardContainer = document.querySelector(".cardContainer");

  // Fetch function

  const fetchWeatherData = async (cityInput) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=cc5c35c597c09c4bd115a5466c75fc5e`
      );

      if (!response.ok) throw new Error();
      if (response.status === "404") throw new Error();

      const data = await response.json();

      console.log(data);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Render function
  const renderFunction = (data, element) => {
    const {
      name: city,
      main: { temp, humidity },
      weather: [{ description, id }],
    } = data;

    cardContainer.innerHTML = "";
    element.innerHTML = `
        <p class="emoji">${renderEmoji(id)}</p>
        <h3 class="cityName">${city}</h3>
        <p class="temp">Temperature: ${((temp - 273.15) * (9 / 5) + 32).toFixed(
          1
        )}°F</p>
        <p class="humidity">Humidity: ${humidity}%</p>
        <p class="discription">Info: ${description}</p>        
      `;

    searchInput.value = "";
  };

  // Emoji function

  const renderEmoji = (id) => {
    switch (true) {
      case id >= 200 && id < 300:
        return "⛈";
      case id >= 300 && id < 400:
        return "🌧";
      case id >= 500 && id < 600:
        return "🌧";
      case id >= 600 && id < 700:
        return "❄";
      case id >= 600 && id < 700:
        return "❄";
      case id >= 700 && id < 800:
        return "🌫";
      case id >= 700 && id < 800:
        return "🌫";
      case id === 800:
        return "☀";
      case id >= 801 && id < 810:
        return "☁";
      default:
        return "?";
    }
  };

  // Add event listener

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      const weatherData = await fetchWeatherData(searchInput.value);
      renderFunction(weatherData, cardContainer);
    } catch (error) {
      errorFunction("Please enter the valid city name");
    }
  });

  // Error function

  const errorFunction = (message) => {
    cardContainer.innerHTML = "";
    cardContainer.textContent = message;

    searchInput.value = "";
  };
};

weatherApp();
