import React, { useState } from "react";
import "./SearchResults.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SearchResults = ({ searchTerm, movies, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moviesPerPage = 8;
  const totalMovies = movies.length;

  // Calculate the displayed movies based on the current index
  const displayedMovies = movies.slice(
    currentIndex,
    currentIndex + moviesPerPage
  );

  const goToNext = () => {
    if (currentIndex + moviesPerPage < totalMovies) {
      setCurrentIndex(currentIndex + moviesPerPage);
    }
  };

  const goToPrevious = () => {
    if (currentIndex - moviesPerPage >= 0) {
      setCurrentIndex(currentIndex - moviesPerPage);
    }
  };

  return (
    <section id="results">
      {/* Loading Progress Bar */}
      {isLoading && (
        <div className="progress-bar__container">
          <div className="progress-bar-track"></div>
          <div className="progress-bar-fill"></div>
        </div>
      )}

      <div className="search-filter">
        <h1 className="results__title">
          Results for: "<span>{searchTerm || "..."}</span>"
        </h1>
        {/* Pagination Arrows */}
        <div className="pagination">
          <button
            className="arrow-button left-arrow"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            &lt;
          </button>
          <div className="divider"></div>
          <button
            className="arrow-button right-arrow"
            onClick={goToNext}
            disabled={currentIndex + moviesPerPage >= totalMovies}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-state">
          {/* <FontAwesomeIcon
            icon={faSpinner}
            className="spinner"
            spin // Adds rotation animation
          /> */}
        </div>
      )}

      {/* Movie Grid */}
      <div id="movies">
        <div className="movies__container">
          {!isLoading && (
            <div className="movie-grid">
              
              {/* No Results Message... */}
              {/* {movies.length === 0 && (
                <h2 className="no-results">No movies found...</h2>
              )} */}

              {/* Display Movies */}
              {displayedMovies?.map((movie) => (
                <Link
                  key={movie.imdbID}
                  to={`/movie/${movie.imdbID}`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none", 
                    padding: "10px", 
                  }}
                >
                  <div key={movie.imdbID} className="movie-card">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="poster"
                    />
                    <div className="movie-info">
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;

{
  /* <!-- <img class="poster" src="https://m.media-amazon.com/images/M/MV5BZGRiMDE1NTMtMThmZS00YjE4LWI1ODQtNjRkZGZlOTg2MGE1XkEyXkFqcGc@._V1_SX300.jpg" alt=""> --> */
}
