const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];

const renderMoive = (filter = "") => {
  const movieList = document.getElementById("movie-list");
  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filterdMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));
  filterdMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const { info, ...otherProps } = movie;
    // const { title: newTitel } = info;
    let { getFormattedTitle } = info;

    let text = movie.getFormattedTitle() + "-";
    for (const key in info) {
      if (key !== "title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandeler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;
  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    alert("enter valid input");
    return;
  }
  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },

    id: Math.random().toString(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  newMovie.info.title = title;
  console.log(newMovie.info.title);
  movies.push(newMovie);
  renderMoive();
};
const searchMoiveHandeler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMoive(filterTerm);
};
addMovieBtn.addEventListener("click", addMovieHandeler);
searchBtn.addEventListener("click", searchMoiveHandeler);
