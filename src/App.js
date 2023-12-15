// Dependencies
import React from "react";
import { useState, useEffect } from "react";
import { styles } from "./styles.css";

// Styles

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const App = () => {
  const [query, setQuery] = useState("Interstellar");
  const [isLoading, setisLoading] = useState(false);
  const [movies, setmovies] = useState([]);
  const [error, seterror] = useState("");
  const [selectedId, setselectedId] = useState(null);

  const KEY = "d5b61cfe";

  function handleSelectmovie(id) {
    setselectedId(id);
  }
  function handleCloseMovie() {
    setselectedId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setisLoading(true);

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok)
            throw new Error("Something went wrong while fetching movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setmovies(data.Search);
        } catch (err) {
          console.log(err.message);
        } finally {
          setisLoading(false);
        }

        // if (query.length < 3) {
        //   setMovies([]);

        // }
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Header />
      {/* <div className="text-center ">
        <Logo />
      </div> */}

      <div className="bg-teal-400 p-4  rounded-lg flex sm:my-4 mx-2 ">
        {/* <h4 className="sm:text-3xl text-black font-semibold">MovieFinder..🎬</h4> */}

        <Navbar>
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </Navbar>
      </div>

      <div className="bg-white sm:bg-purple-400 h-auto sm:m-4 m-1 rounded-lg ">
        <div className="sm:flex sm:flex-row  flex-col sm:flex sm:justify-center  my-4 gap-10">
          <div className=" bg-green-300 h-96 w-[22rem] sm:w-96 sm:h-[34rem]  m-1  rounded-2xl hover:shadow-md ">
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <MovieList movies={movies} onSelectmovie={handleSelectmovie} />
            )}
            {error && <ErrorMessage message={error} />}
          </div>
          <div className="bg-red-200 sm:h-[34rem] w-[22rem] h-[32rem]   sm:w-96 m-1 rounded-2xl hover:shadow-lg">
            {/* <h3>Movie Information</h3> */}
            <Box>
              <MovieDetails
                query={query}
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

function Header() {
  return (
    <header class="bg-blue-500 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a href="#" class="text-white text-2xl font-bold">
          Movie Finder..!
        </a>
        <nav class="space-x-4">
          <a href="#" class="text-white">
            Home
          </a>
          <a href="#" class="text-white">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}

function Navbar({ children }) {
  return <div>{children}</div>;
}

// function Logo() {
//   return (
//     <div>
//       <h1 className="font-semibold text-lg  sm:text-3xl">MovieFinder 🍿</h1>
//     </div>
//   );
// }

function Search({ query, setQuery }) {
  return (
    <div>
      <input
        className="mx-1 rounded-md px-3 py-1 sm:mx-96 w-auto sm:w-96 sm:p-3"
        placeholder="Search Movies "
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <div>
      <p className="font-semibold  my-1 sm:text-xl">
        Found <strong>{movies.length}</strong> results
      </p>
    </div>
  );
}

function MovieList({ movies, onSelectmovie }) {
  return (
    <div className="overflow-auto sm:h-[34rem] h-96 ">
      <ul>
        {movies.map((movie) => (
          <Movie movie={movie} onSelectmovie={onSelectmovie} />
        ))}
      </ul>
    </div>
  );
}

function Movie({ movie, onSelectmovie }) {
  return (
    <li
      className="   border-2 p-3 flex hover:bg-yellow-200  cursor-pointer "
      onClick={() => onSelectmovie(movie.imdbID)}
    >
      <hr />
      <img
        src={movie.Poster}
        className=" h-20 w-16  "
        alt={`${movie.Title} poster`}
      />
      <h3 className="font-semibold text-md my-1 sm:text-lg">{movie.Title}</h3>

      <p className="flex font-normal my-1 ">
        <span>({movie.Year})</span>
      </p>

      <hr />
    </li>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default App;

// //    <img
// className="sm:w-[100rem] sm:h-[48rem]"
// src="https://shots.codepen.io/username/pen/OJNQwYw-800.jpg?version=1599775320"
// />

function SelectedMovie({ selectedid }) {
  return <div>{selectedid}</div>;
}

function MovieDetails({ selectedId, onCloseMovie, query }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setisLoading(true);
        const KEY = "1536f428";
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setisLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      document.title = `Movie | ${title}`;
    },
    [title]
  );
  return (
    <div>
      <>
        <header>
          {/* <button onClick={onCloseMovie} className="btn-back">
            &larr;
          </button> */}
          <div className="flex flex-row">
            <img
              className="w-36 h-42 mx-2 hover:h-"
              src={poster}
              alt={`Poster of the ${movie} movie `}
            />
            <div className="details-overview mx-4 ">
              <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
              <p className="font-semibold my-2">
                {released} &bull; {runtime}
              </p>
              <p className="font-semibold my-2">{genre}</p>
              <p className="font-bold -mx-1">
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </div>
          <hr />
        </header>
        <section>
          <div className="rating p-2">
            {/* <StarRating
                maxRating={10}
                size={24}
                onsetRating={setUserRating}
              /> */}

            <button className="btn-add">+ Add to the list</button>
          </div>
          <p className="m-2 font-medium">
            <em>{plot}</em>
          </p>
          <p className="-mx-2 font-semibold text-left p-3 sm:mx-2 sm:text-left  ">
            {" "}
            Directed by: {director}
          </p>
          <p className="sm:text-center  ">Starring: {actors}</p>
        </section>
      </>

      {/* {selectedId} */}
    </div>
  );
}
