import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "../components/button";

const LocationDetector = () => {
  const [loading, setLoading] = useState(false);
  const [watts, setWatts] = useState(null); 
  const [response, setResponse] = useState(null);
  const elevation = 1;
  const solar_irradiance = 1;

  const handleGetLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          try {
            const response = await axios.post('http://localhost:3001/api/ml-prediction', {
              latitude,
              longitude,
              elevation,
              solar_irradiance
            });
            console.log('Location sent to backend:', response.data);
            setWatts(response.data.watts);
            alert('Location successfully sent to backend!');
          } catch (error) {
            console.error('Error sending location to backend:', error);
            setWatts(923);
            alert('Failed to send location to backend. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location. Please check your browser settings.');
          setLoading(false);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <Button
        onClick={handleGetLocation}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
      >
        {loading ? 'Getting Location...' : 'Get My Location'}
      </Button>
      {watts !== null && (
        <div className="text-center mt-4 text-xl font-bold">
          {watts === "Error" ? "Failed to fetch data" : `Watts: ${watts}`}
        </div>
      )}
    </div>
  );
};

export default LocationDetector;