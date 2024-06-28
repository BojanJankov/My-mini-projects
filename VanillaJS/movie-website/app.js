console.log("Script is working");

/*
Nav bar link :
https://dev.to/david_bilsonn/learn-how-to-build-responsive-navigation-bar-with-html-css-javascript-4g5

Link for api page:

https://developer.themoviedb.org/reference/authentication-how-do-i-generate-a-session-id

Youtube link for app:(this is main video for this app)(50min of video for how to get api key and fetch it)

https://www.youtube.com/watch?v=_DaH6PIn0Ak

Other youtube video for app:()

https://www.youtube.com/watch?v=27FfmGHtKzs

The database movie api acc:

Username: BojanJankov

pw: bojanjankov123

API key: 0ea333a25aa3b4de388edeabfd6be18e

IMG URL: https://image.tmdb.org/t/p/w500


API URL: https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0ea333a25aa3b4de388edeabfd6be18e

Youtube video for next and prev button and all with this project:

https://www.youtube.com/watch?v=Oruem4VgRCs&list=PLX7mEGqtfnSpsCJB7vpTh5tGY8YqoykbL&index=3


*/

const movieApp = () => {
  // Selectors

  //   URLs
  const DATA_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0ea333a25aa3b4de388edeabfd6be18e`;
  //   `https://api.themoviedb.org/3/search/movie?api_key=0ea333a25aa3b4de388edeabfd6be18e&query=`
  //   `https://api.themoviedb.org/3/genre/movie/list?api_key=0ea333a25aa3b4de388edeabfd6be18e`

  // Search selectors
  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector(".searchBtn");

  // General message selector
  const generalMessage = document.querySelector(".general-message");

  // Card container celector
  const cardContainer = document.querySelector(".card-container");
  const mainCardContainer = document.querySelector(".main-container");

  // Button selectors

  const nextButton = document.querySelector(".nextButton");
  const prevButton = document.querySelector(".prevButton");

  // Variables for next and prev button working

  // Fetch data

  const fetchMovies = async (url) => {
    lastUrl = url;
    try {
      const response = await fetch(url);

      if (response.status === 404) throw new Error();

      const data = await response.json();
      currentPage = data.page;
      nextPage = currentPage + 1;
      prevPage = currentPage - 1;
      totalPages = data.total_pages;

      console.log(data);

      renderFunction(data.results, mainCardContainer);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // Functions

  //   Render data in html

  const renderFunction = (data, element) => {
    element.innerHTML = "";
    generalMessage.style.display = "none";
    data.forEach((movie) => {
      const { title, release_date, vote_average, overview, poster_path } =
        movie;
      element.innerHTML += `
      <div class="card-container">
      <div class="card-img">
        <img
          src="https://image.tmdb.org/t/p/w500${poster_path}"
          alt="movie-img"
          height="110px"
        />
      </div>
      <h3 class="card-title">${title}</h3>
      <p>Release date: ${release_date}</p>
      <p>Rating: ${vote_average.toFixed(1)}</p>
      <p>Discription: ${overview}</p>
    </div>`;
    });
  };

  //   Add event listener on search button

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    const searchValue = searchInput.value;
    if (!searchValue) fetchMovies(DATA_URL);
    if (searchValue) {
      fetchMovies(
        `https://api.themoviedb.org/3/search/movie?api_key=0ea333a25aa3b4de388edeabfd6be18e&query=${searchValue}`
      );
    }

    searchInput.value = "";
  });

  // Side bar

  // Array with genre id's and names of movie types
  let genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  // Empty array, and will be added elements when someone
  let selectedGenre = [];
  // Type list in aside container
  const typeListEl = document.querySelector(".type-list");

  // Function that take genre id's and names and create li elements in the type list and save with id and name
  const setGenre = () => {
    typeListEl.innerHTML = "";
    genres.forEach((genre) => {
      // Creating li element for ul type list in aside container and adding class, id and name as a text
      const sortListEl = document.createElement("li");
      sortListEl.classList.add("tag");
      sortListEl.id = genre.id;
      sortListEl.innerText = genre.name;
      // This add event listener on click will check empty selectedGenre array and if array is empty will push genre id from clicked element
      // in array and if array is not empty will remove the element from it
      sortListEl.addEventListener("click", (event) => {
        if (selectedGenre.length === 0) {
          selectedGenre.push(genre.id);
        } else {
          if (selectedGenre.includes(genre.id)) {
            selectedGenre.forEach((id, index) => {
              if (id === genre.id) {
                selectedGenre.splice(index, 1);
              }
            });
          } else {
            selectedGenre.push(genre.id);
          }
        }
        // Calling the fetch data with modifited DATA_URL (added genres and encodeURI with genres id array)
        fetchMovies(
          DATA_URL + `&with_genres=` + encodeURI(selectedGenre.join(","))
        );
      });
      // Append li elements to ul list elemenet
      typeListEl.appendChild(sortListEl);
    });
  };
  // Calling the setGenre function for aside type list and filter movies by type
  setGenre();

  //  Next and prev button functions

  // This function is for next and prev button and work in the end with fetch function and will be display data in containres when next button
  // is clicked, take page as a parametar create link with split parts and save as a new variables, and adding to same and call the
  // fetch function at the end with that link and that work for first and second page, after that in else block we finish the logic
  // for 3 page and all after that page to the end(totalPages). Also variables that are used in this function are declared in the
  // fetch function at the beggining of the code
  const pageCall = (page) => {
    // Split last fetch url with ?, & and = to convert to new url
    let urlSplit = lastUrl.split("?");
    let queryParams = urlSplit[1].split("&");
    let key = queryParams[queryParams.length - 1].split("=");
    // Adding to url if is not there, &page= and page number as a page variable
    if (key[0] !== "page") {
      let url = lastUrl + "&page=" + page;
      // Calling fetch function with new url to fetch and render data from new link
      fetchMovies(url);
    } else {
      // In else block we convert element with index 1 from key to string and join him in string with =
      // an then covnert to bKey and join with & and also create new link for fetch function
      //
      key[1] = page.toString();
      let aKey = key.join("=");
      queryParams[queryParams.length - 1] = aKey;
      let bKey = queryParams.join("&");
      let url = urlSplit[0] + "?" + bKey;
      // Also calling the fetch function with the new link
      fetchMovies(url);
    }
  };

  // Next page add event listener
  nextButton.addEventListener("click", (event) => {
    if (nextPage <= totalPages) {
      // Calling pageCall function with nextPage variable, if next page is = or < of total pages
      pageCall(nextPage);
    }
    // Prev page add event listener
    prevButton.addEventListener("click", () => {
      if (prevPage > 0) {
        // Calling pageCall function with prevPage variable, if prevPage is bigger then 0
        pageCall(prevPage);
      }
    });
  });

  // Error function

  const errorMessage = (message) => {
    mainCardContainer.innerHTML = "";
    mainCardContainer.innerHTML = message;
  };
};

movieApp();
