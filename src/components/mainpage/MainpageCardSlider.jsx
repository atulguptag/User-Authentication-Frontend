import "./mainpage-card-slider.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const MainpageCardSlider = ({ id, inTheatre }) => {
  const [movieList, setmovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/movies/');
        setmovieList(response.data);
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
      {movieList ? (
        <div className="carousel-inner">
          {[...Array(Math.ceil(movieList.length / 5))].map((x, i) => (
            <div
              key={i}
              className={i === 0 ? "carousel-item active" : "carousel-item"}
            >
            </div>
          ))}
        </div>
      ) : ([])}
    </div>
  );
};

export default MainpageCardSlider;
