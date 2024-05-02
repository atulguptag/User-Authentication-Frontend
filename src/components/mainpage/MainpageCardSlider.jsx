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
        setMovieList(response.data);
      } catch (error) {
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
        <div className="carousel-inner">
          {movieList.map((movie, index) => (
            <div
              key={index}
              className="carousel-item active"
            >
              <img
                src={movie.poster_link}
                className="movie-poster"
                alt={movie.title}
              />
              <div className="movie-detail-block">
                <h5>{movie.title}</h5>
                <p><strong>Genres: </strong>{movie.genre}</p>
                <p>
                <strong>Release Date: </strong>{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p><strong>Duration: </strong>{movie.duration} minutes</p>
                <p><strong>Rating: </strong>{movie.rating} / 10</p>
                <p><strong>In Theatre: </strong> {movie.in_theatre ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainpageCardSlider;
