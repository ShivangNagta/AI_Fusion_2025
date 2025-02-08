from flask import Flask, request, jsonify
import joblib
import numpy as np
import requests  # Import the requests library

# Load the trained model
model = joblib.load('solar_energy_model.pkl')

# Initialize Flask app
app = Flask(__name__)

# Replace with your actual API access key
WEATHERSTACK_API_KEY = "0c5622bfde2febfc8b55262a0dcdabfe" 

def get_weather_data(location):
    """
    Fetches weather data from the weatherstack API.
    """
    url = "http://api.weatherstack.com/current"
    params = {
        "access_key": WEATHERSTACK_API_KEY,
        "query": location
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
        data = response.json()
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching weather data: {e}")
        return None


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.json
        location = data['location']

        # Fetch weather data from weatherstack API
        weather_data = get_weather_data(location)
        if weather_data is None or not weather_data.get('success', True):  # Check for API errors
            return jsonify({"error": "Failed to retrieve weather data for the location"}), 400

        # Extract relevant weather features from the API response
        temperature = weather_data['current']['temperature']
        humidity = weather_data['current']['humidity']
        cloud_cover = weather_data['current']['cloudcover']
        wind_speed = weather_data['current']['wind_speed']

        # Extract elevation (assuming you have a way to get this, e.g., from a database or another API)
        #  For now, I am assuming the elevation is passed in the JSON payload
        elevation = data.get('elevation', 0)
        solar_irradiance = data.get('solar_irradiance', 5)


        # Prepare features for the ML model (match the order used during training)
        features = [
            elevation,
            temperature,
            humidity,
            solar_irradiance,
            cloud_cover,
            wind_speed
        ]


        # Convert to NumPy array and reshape for prediction
        input_data = np.array([features])

        # Make a prediction
        prediction = model.predict(input_data)[0]

        return jsonify({"prediction": float(prediction)})

    except KeyError as e:
          return jsonify({"error": f"Missing data in API response: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
