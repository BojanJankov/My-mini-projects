console.log("Script is working");

/*
Bonus Workshop
CountrySearch 🌍🌎🌏
CountrySearch is an application that is meant to search for countries and get data for them in real-time. The application is very simple. 
It only has one functionality: Search and show the countries in cards

Requirements
There should be one search input to input the name or partial name of a country
There should be a button for search to initiate
When the button is clicked, show countries in cards with the info below
The card shows:
Flag (photo of the flag)
Name
Population
Capital
Area
If there are no results found show a "Country Not Found" message on the screen
The API for countries is: https://restcountries.com/
Read the API documentation to figure out how to call for the countries
Extra requirements
List language names and currency names in the table as well ( only names and divided by, EX: Spanish, English )
Add loading image (or spinner) while it is getting the data
Add a filter by name, area, and population in descending order
Add a filter by name, area, and population in ascending order
*/

const app = () => {
  // URL links for feteching API data

  const countryURL_ALL = "https://restcountries.com/v3.1/all";
  const countryURL_NAME = `https://restcountries.com/v3.1/name/`;

  // Selectors
  // Error selector
  const errorContainer = document.querySelector(".error");

  // Search selectors
  const serachInput = document.querySelector(".searchInput");
  const searchButton = document.querySelector(".searchButton");

  // Card selectors
  const cardContainer = document.querySelector(".all-card-container");

  // Filter selectors

  const filterInput = document.querySelector("#filterInput");
  const sortInput = document.querySelector("#sortInput");
  const filterButton = document.querySelector("#filterBtn");

  // Fetching data for all countries

  // Global variable for country data

  let countryData = [];

  const fetchCountryData = async (url) => {
    spinner(true);
    try {
      const response = await fetch(url);

      if (response.status === 404) throw "Country not found";

      const data = await response.json();

      renderAllDataCountry(data, cardContainer);

      console.log(data);
      spinner(false);
      return data;
    } catch (error) {
      spinner(false);
      throw new Error(error);
    }
  };

  // Render function

  const renderAllDataCountry = (countryData, element) => {
    const cardHTML = countryData
      .map((country) => {
        return `
<section class="card-container">
<div class="flag">
    <img
        src="${country.flags.png}"
        alt="${country.flags.alt}"
        width="100px"
        class="flag"
    />
</div>
<div class="countryInfo">
    <h4>Name:${country.name.common} </h4>
    <h4>Population: ${country.population}</h4>
    <h4>Capital city: ${country.capital ? country.capital[0] : "N/A"}</h4>    
    <h4>Area: ${country.area}</h4>
    <h4>Currencies: ${
      country.currencies
        ? Object.keys(country.currencies)
            .map((key) => country.currencies[key].name)
            .join(", ")
        : "N/A"
    }</h4>      
    <h4>Languages: ${
      country.languages ? Object.values(country.languages).join(", ") : "N/A"
    }</h4>
</div>
</section>
  `;
      })
      .join("");

    element.innerHTML = cardHTML;

    serachInput.value = "";
  };

  // Filter function

  const filterCountry = (filter, sort, countryData) => {
    const countryDataCopy = [...countryData];

    if (filter === "name") {
      countryDataCopy.sort((a, b) => {
        if (sort === "asc") {
          if (a.name.common > b.name.common) return 1;
          if (a.name.common < b.name.common) return -1;
        } else {
          if (a.name.common < b.name.common) return 1;
          if (a.name.common > b.name.common) return -1;
        }
      });
    }

    if (filter === "population") {
      countryDataCopy.sort((a, b) =>
        sort === "asc"
          ? a.population - b.population
          : b.population - a.population
      );
    }

    if (filter === "area") {
      countryDataCopy.sort((a, b) =>
        sort === "asc" ? a.area - b.area : b.area - a.area
      );
    }

    renderAllDataCountry(countryDataCopy, cardContainer);
  };

  // Add event listeners

  searchButton.addEventListener("click", async () => {
    try {
      const searchValue = serachInput.value;
      // If search input is empty, when someone click the button, all countries will be shown on screen in the containers
      if (!searchValue) {
        countryData = await fetchCountryData(countryURL_ALL);
      }
      // Render data by name function, display country that is searched by name
      if (searchValue) {
        countryData = await fetchCountryData(
          `${countryURL_NAME}${searchValue}`
        );
      }

      // Calling render function
      renderAllDataCountry(countryData, cardContainer);
      errorContainer.innerHTML = "";
    } catch (error) {
      displayError(error, errorContainer);
    }
  });

  filterButton.addEventListener("click", () => {
    const filterInputValue = filterInput.value;
    const sortInputValue = sortInput.value;

    filterCountry(filterInputValue, sortInputValue, countryData);

    console.log(filterInputValue);
  });

  // Error fucntion

  const displayError = (error, element) => {
    cardContainer.innerHTML = "";
    element.innerHTML = error;
    serachInput.value = "";
  };

  // Spinner function

  const spinner = (isShown) => {
    const spinnerContainer = document.querySelector(".spinner-container");

    if (isShown) {
      spinnerContainer.classList.remove("hide");
    } else {
      spinnerContainer.classList.add("hide");
    }
  };
};

app();
