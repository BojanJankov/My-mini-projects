console.log("Script is working");

/*
JediArchives 📚
Idea ☄
The Jedi Archives has long been forgotten, but that should not stop us from rebuilding this masterpiece of knowledge. The JediArchives app is the first step to rebuilding the collective knowledge about the Star Wars universe. The app should help any user that is interested in some Star Wars data to go through the archive and find what they are looking for. A small step for the internet, but a huge step for Star Wars fans.

Requirements 🗺
The web page should be:

Single page application
There should be only one page
The logo should show at the front of the page
On the page there should be an image of person and space-ship that get data for the corresponding image and display a table
Tables:
 Person
    Name
    Height
    Mass
    Gender
    Birth Year
    Appearances ( Count of movies they appeared in )
 Ship
    Name
    Model
    Manufacturer
    Cost
    People Capacity ( Max people on board )
    Class
There should be 10 records per page of a table
There should be next/previous buttons to change the pages
Flow 🌈

Person opens the web app

Right away the StarWars logo is shown and images of a person and spaceship
The person clicks on the person image
A table is generated with 10 people from the StarWars universe and below, a next button
The person clicks on the Next button
Immediately the view changes to a new table with new people and a previous button appears
A table is generated with 10 ships from the StarWars universe and below, a next button
The person clicks on the Next button
Immediately the view changes to a new table with new ships and a previous button appears
The person clicks on the previous button
Impiety the view changes to a new table with the first ships and the previous button disappears
*/

// Mock

// const personMock = {
//     name: "Luke Skywalker", //Name
//     height: "172", // Height
//     mass: "77", //Mass
//     hair_color: "blond",
//     skin_color: "fair",
//     eye_color: "blue",
//     birth_year: "19BBY", // Birth Year
//     gender: "male", // Gender
//     homeworld: "https://swapi.dev/api/planets/1/",
//     films: [
//       //Appereances - films.length
//       "https://swapi.dev/api/films/1/",
//       "https://swapi.dev/api/films/2/",
//       "https://swapi.dev/api/films/3/",
//       "https://swapi.dev/api/films/6/",
//     ],
//     species: [],
//     vehicles: [
//       "https://swapi.dev/api/vehicles/14/",
//       "https://swapi.dev/api/vehicles/30/",
//     ],
//     starships: [
//       "https://swapi.dev/api/starships/12/",
//       "https://swapi.dev/api/starships/22/",
//     ],
//     created: "2014-12-09T13:50:51.644000Z",
//     edited: "2014-12-20T21:17:56.891000Z",
//     url: "https://swapi.dev/api/people/1/",
//   };

//   const shipMock = {
//     name: "CR90 corvette", //Name
//     model: "CR90 corvette", //Model
//     manufacturer: "Corellian Engineering Corporation", // Manufacturer
//     cost_in_credits: "3500000", // Cost (credits)
//     length: "150",
//     max_atmosphering_speed: "950",
//     crew: "30-165", // Crew OR
//     passengers: "600", //Passengers
//     cargo_capacity: "3000000",
//     consumables: "1 year",
//     hyperdrive_rating: "2.0",
//     MGLT: "60",
//     starship_class: "corvette", //Class
//     pilots: [],
//     films: [
//       "https://swapi.dev/api/films/1/",
//       "https://swapi.dev/api/films/3/",
//       "https://swapi.dev/api/films/6/",
//     ],
//     created: "2014-12-10T14:20:33.369000Z",
//     edited: "2014-12-20T21:23:49.867000Z",
//     url: "https://swapi.dev/api/starships/2/",
//   };

// Persons selectors

const yodaContainer = document.querySelector(".yoda-container");
const yodaImg = document.querySelector(".yoda");
const previousButtonPersons = document.createElement("button");

// Ships selectors
const spaceShipsContainer = document.querySelector(".spaceship-container");
const shipImg = document.querySelector(".spaceship");
const nextButtonShips = document.createElement("button");
const previousButtonShips = document.createElement("button");

// Planet selectors

const planetContainer = document.querySelector(".planet-container");
const planetImage = document.querySelector(".planet");

// URLS for fetching data

const PERSONS_FIRST_URL = "https://swapi.dev/api/people/?page=1";
const SHIPS_URL = "https://swapi.dev/api/starships/?page=1";

// Fetch function for persons

const fetchStarWarsApi = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data.results);

    renderPeopleTable(data);
    renderButtonsPersons(yodaContainer, data, fetchStarWarsApi);
  } catch (error) {
    console.log(error);
  }
};

// This function will be crate a HTML table with persons data

const generatePersonsTable = (element, personsDetalis) => {
  element.innerHTML = "";
  const rowHTML = (element.innerHTML = personsDetalis.map((person) => {
    return `
    <tr>
    <td>${person.name}</td>
    <td>${person.height}</td>
    <td>${person.mass}</td>
    <td>${person.birth_year}</td>
    <td>${person.gender}</td>
    <td>${person.films.length}</td>
    <tr>`;
  }));
  element.innerHTML = `
  <table class="yoda-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th>Appereances</th>
          </tr>
        </thead>
        <tbody>
        ${rowHTML}       
        </tbody>
  </table>
  `;
};

// Render function for persons table

const renderPeopleTable = (data) => {
  generatePersonsTable(yodaContainer, data.results);
};
// Add event listener for render table data for persons

yodaImg.addEventListener("click", () => {
  fetchStarWarsApi(PERSONS_FIRST_URL);
});

// Function for crateing buttons for next and previous data and will work with callback function when is callled in fetch function.They will be create and will have function for displaying data in table when is clicked

const renderButtonsPersons = (element, data, callback) => {
  if (data.next) {
    const nextButtonPersons = document.createElement("button");
    nextButtonPersons.innerText = "Next persons";
    nextButtonPersons.className = "nextBtnPersons";
    element.appendChild(nextButtonPersons);
    nextButtonPersons.addEventListener("click", () => {
      callback(data.next);
    });
  }
  if (data.previous) {
    const previousButtonPersons = document.createElement("button");
    previousButtonPersons.innerText = "Previous persons";
    previousButtonPersons.className = "previousBtnPersons";
    element.appendChild(previousButtonPersons);
    previousButtonPersons.addEventListener("click", () => {
      callback(data.previous);
    });
  }
};

// Spaceships fetch function

const spaceShipFetch = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    renderShipsTableHTML(spaceShipsContainer, data.results);
    renderButtonsShips(spaceShipsContainer, data, spaceShipFetch);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Spaceship table render table function

const renderShipsTableHTML = (element, shipsDetalis) => {
  const rowHTML = (element.innerHTML = shipsDetalis.map((ship) => {
    return `<tr>
    <td>${ship.name}</td>
    <td>${ship.model}</td>
    <td>${ship.manufacturer}</td>
    <td>${ship.cost_in_credits}</td>
    <td>${ship.passengers}</td>
    <td>${ship.starship_class}</td>
    <tr>`;
  }));

  element.innerHTML = `
  <table class="ship-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufactuer</th>
            <th>Cost(credits)</th>
            <th>People Capacity</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
        ${rowHTML}
        </tbody>
  </table>
  `;
};

// Spaceship buttons and render buttons function

const renderButtonsShips = (element, data, callback) => {
  if (data.next) {
    const nextButtonShips = document.createElement("button");
    nextButtonShips.innerText = "Next spaceships";
    nextButtonShips.className = "nextBtnShips";
    element.appendChild(nextButtonShips);
    nextButtonShips.addEventListener("click", () => {
      callback(data.next);
    });
  }
  if (data.previous) {
    const previousButtonShips = document.createElement("button");
    previousButtonShips.innerText = "Previous spaceships";
    previousButtonShips.className = "previousBtnShips";
    element.appendChild(previousButtonShips);
    previousButtonShips.addEventListener("click", () => {
      callback(data.previous);
    });
  }
};

// Add event listener for spaceship img to display table

shipImg.addEventListener("click", () => {
  spaceShipFetch(SHIPS_URL);
});

// Planets

const PLANETS_URL = "https://swapi.dev/api/planets/?page=1";

const fetchPlantes = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    renderPlanetTable(planetContainer, data.results);
    renderButtonsPlanet(planetContainer, data, fetchPlantes);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Render table for planets

const renderPlanetTable = (element, planetDetalis) => {
  const rowHTML = (element.innerHTML = planetDetalis.map((planet) => {
    return `<tr>
    <td>${planet.name}</td>
    <td>${planet.population}</td>
    <td>${planet.climate}</td>
    <td>${planet.gravity}</td>
    <td>${planet.terrain}</td>    
    <tr>`;
  }));
  element.innerHTML = `
  <table class="planet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>            
          </tr>
        </thead>
        <tbody>
        ${rowHTML}
        </tbody>
  </table>
  `;
};

// Buttons for table

const renderButtonsPlanet = (element, data, callback) => {
  if (data.next) {
    const nextButtonPlanets = document.createElement("button");
    nextButtonPlanets.innerText = "Next planets";
    nextButtonPlanets.className = "nextBtnPlanet";
    element.appendChild(nextButtonPlanets);
    nextButtonPlanets.addEventListener("click", () => {
      callback(data.next);
    });
  }
  if (data.previous) {
    const previousButtonPlanet = document.createElement("button");
    previousButtonPlanet.innerText = "Previous planets";
    previousButtonPlanet.className = "previousBtnPlanet";
    element.appendChild(previousButtonPlanet);
    previousButtonPlanet.addEventListener("click", () => {
      callback(data.previous);
    });
  }
};

// Add event listener for planet image

planetImage.addEventListener("click", () => {
  fetchPlantes(PLANETS_URL);
});
