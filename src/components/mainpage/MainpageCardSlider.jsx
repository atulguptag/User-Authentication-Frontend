import "./mainpage-card-slider.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const MainpageCardSlider = ({ id, inTheatre }) => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://guptag.pythonanywhere.com/accounts/movies/"
        );

        // Sort the movie list based on release date
        const sortedMovies = response.data.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.current_datetime);
        });
        setMovieList(sortedMovies);
      }
      catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div
      id={"carouselExampleControls" + id}
      className="carousel slide "
      data-ride="carousel"
    >
      {movieList.length > 0 && (
        <div className="carousel-items-outer">
          {movieList.map((movie, index) => (
            <div key={index} className="carousel-items-inner">
              <img
                src={movie.poster_link}
                className="movie-poster"
                alt={movie.title}
              />
              <div className="movie-detail-block">
                <h5>{movie.title}</h5>
                <p>
                  <strong>Genres: {movie.genre}</strong>
                </p>
                <p>
                  <strong>
                    Release Date:{" "}
                    {new Date(movie.release_date).toLocaleDateString()}
                  </strong>
                </p>
                <p>
                  <strong>Duration: {movie.duration} minutes</strong>
                </p>
                <p>
                  <strong>Rating: {movie.rating} / 10</strong>
                </p>
                <p>
                  <strong>In Theatre: {movie.in_theatre ? "Yes" : "No"}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainpageCardSlider;
