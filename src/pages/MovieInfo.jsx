import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MovieInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MovieInfo = () => {
  const { imdbID } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMovie(imdbID) {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=d65f83fb&i=${imdbID}`
      );
      const data = await response.json();
      setMovieInfo(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMovie(imdbID);
  }, [imdbID]);

  return (
    <div id="info">
      <div className="movie__container">
        {loading ? (
          <FontAwesomeIcon icon={faSpinner} spin size="3x"/>
        ) : (
          <div className="movie">
            <div className="poster__container">
              <figure>
                <img className="poster" src={movieInfo?.Poster} alt="" />
              </figure>
              <h1 className="title">{movieInfo?.Title}</h1>
              <p className="year">{movieInfo?.Year}</p>
            </div>
            <div className="movie__content">
              <h3 className="genre">
                <span className="maroon">Genre: </span>
                {movieInfo?.Genre}
              </h3>
              <h3 className="rated">
                <span className="maroon">Rated: </span>
                {movieInfo?.Rated}
              </h3>
              <h3 className="director">
                <span className="maroon">Director: </span>
                {movieInfo?.Director}
              </h3>
              <h3 className="writer">
                <span className="maroon">Writer: </span>
                {movieInfo?.Writer}
              </h3>
              <h3 className="actors">
                <span className="maroon">Actors: </span>
                {movieInfo?.Actors}
              </h3>
              <h3 className="runtime">
                <span className="maroon">Runtime: </span>
                {movieInfo?.Runtime}
              </h3>
              <h3 className="rating">
                <span className="maroon">Imdb Rating: </span>
                {movieInfo?.imdbRating}
              </h3>
              <h3 className="description">
                <span className="maroon">Plot:</span>
                {movieInfo?.Plot}
              </h3>
            </div>
          </div>
        )}
      </div>
      <Link to={`/search/${sessionStorage.getItem("lastSearchTerm") || ""}`}>
        <div className="go-back">Go Back</div>
      </Link>
    </div>
  );
};

export default MovieInfo;
