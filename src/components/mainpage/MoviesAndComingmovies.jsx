import { useState, useEffect } from "react";
import "./mainpage-card-slider.css";
import MainpageCardSlider from "./MainpageCardSlider";

const MoviesAndComingmovies = () => {
  const [apiKey] = useState("");

  useEffect(() => {
    document.title = "Welcome to MoviePassa";
  }, []);
  
  return (
    <>
      <div className="site-lower-row-container-inner">
        <div className="nav nav-tabs tabs">
          <button
            className="nav-link active film-options"
            id="nav-home-tab"
            type="button"
          >
            Movies In Theaters
          </button>
          {/* <button
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
          </button> */}
        </div>
      </div>
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
            tabIndex="1"
          >
            <MainpageCardSlider apiKey={apiKey} id={1} inTheatre={true} />
          </div>
        </div>
        {/* <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
          tabIndex="0"
        >
          <MainpageCardSlider id={2} inTheatre={false} />
        </div> */}
      </div>
    </>
  );
};
export default MoviesAndComingmovies;
