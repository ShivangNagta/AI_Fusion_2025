import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "../components/button";

const LocationDetector = () => {
  const [loading, setLoading] = useState(false);
  const elevation = 1;
  const solar_irradiance = 1;

  const handleGetLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.post('https://your-backend-url.com/api/location', {
              latitude,
              longitude,
              elevation,
              solar_irradiance
            });
            console.log('Location sent to backend:', response.data);
            alert('Location successfully sent to backend!');
          } catch (error) {
            console.error('Error sending location to backend:', error);
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
    <div className="flex justify-center mt-4">
      <Button
        onClick={handleGetLocation}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Getting Location...' : 'Get My Location'}
      </Button>
    </div>
  );
};

export default LocationDetector;