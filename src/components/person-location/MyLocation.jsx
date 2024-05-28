import React, { useState, useEffect } from 'react';
import "./MyLocation.css";

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="location-component">
      <h2>Your current location:</h2>
      {latitude && longitude ? (
        <p>Latitude: {latitude}, Longitude: {longitude}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationComponent;