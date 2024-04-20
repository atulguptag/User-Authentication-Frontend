import { useState, useEffect } from "react";
import "./mainpage-card-slider.css";
import axios from "axios";
import MainpageCardSlider from "./MainpageCardSlider";

const MoviesAndComingmovies = () => {
  const [apiKey, setmovieList] = useState("");

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
    <div>
      <nav>
        <div className="nav nav-tabs tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active film-options"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Movies In Theaters
          </button>
          <button
            className="nav-link film-options"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Coming Soon
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex="0"
        >
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            tabIndex="0"
          >
            <h1 className="under-dev">Under Development</h1>
            <MainpageCardSlider apiKey={apiKey} id={1} inTheatre={true} />
          </div>
          <MainpageCardSlider id={1} inTheatre={true} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabIndex="0"
        >
          <h1 className="under-dev">Under Development</h1>
          <MainpageCardSlider id={2} inTheatre={false} />
        </div>
      </div>
    </div>
  );
};
export default MoviesAndComingmovies;
