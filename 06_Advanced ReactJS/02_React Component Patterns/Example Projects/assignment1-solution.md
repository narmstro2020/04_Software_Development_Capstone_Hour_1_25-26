# Assignment 1: Weather Dashboard - Solution

## Complete Solution Code

### App.jsx
```jsx
import WeatherContainer from './components/WeatherContainer';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Weather Dashboard</h1>
            <WeatherContainer />
        </div>
    );
}

export default App;
```

### components/WeatherContainer.jsx
```jsx
import { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

const WeatherContainer = () => {
    // State management
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('London');

    // Fetch weather function
    const fetchWeather = async (cityName) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=demo&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            setWeather(data);
            setCity(cityName);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    // Fetch weather for default city on mount
    useEffect(() => {
        fetchWeather(city);
    }, []); // Empty dependency array - runs once on mount

    // Handle search
    const handleSearch = (searchCity) => {
        if (searchCity.trim()) {
            fetchWeather(searchCity);
        }
    };

    // Conditional rendering based on state
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div>
                <SearchBar onSearch={handleSearch} />
                <div className="error">Error: {error}</div>
            </div>
        );
    }

    // Main render
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {weather && <WeatherDisplay weather={weather} />}
        </div>
    );
};

export default WeatherContainer;
```

### components/WeatherDisplay.jsx
```jsx
const WeatherDisplay = ({ weather }) => {
    // Extract data from weather prop
    const { name, main, weather: weatherArray, wind } = weather;
    const weatherInfo = weatherArray[0];
    
    return (
        <div className="weather-display">
            <h2>{name}</h2>
            <div className="weather-icon">
                <img 
                    src={`https://openweathermap.org/img/w/${weatherInfo.icon}.png`}
                    alt={weatherInfo.description}
                />
            </div>
            <p className="temperature">{Math.round(main.temp)}°C</p>
            <p className="description">{weatherInfo.description}</p>
            <div className="weather-details">
                <p>💧 Humidity: {main.humidity}%</p>
                <p>💨 Wind Speed: {wind.speed} m/s</p>
            </div>
        </div>
    );
};

export default WeatherDisplay;
```

### components/SearchBar.jsx
```jsx
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    // Controlled input state
    const [inputValue, setInputValue] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch(inputValue);
            setInputValue(''); // Clear input after search
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter city name..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
```

### components/LoadingSpinner.jsx
```jsx
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            Loading...
        </div>
    );
};

export default LoadingSpinner;
```

### Enhanced App.css
```css
.App {
    text-align: center;
    padding: 20px;
    font-family: Arial, sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.App h1 {
    color: white;
    margin-bottom: 30px;
}

.search-bar {
    margin: 20px 0;
}

.search-bar input {
    padding: 10px 15px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 250px;
    font-size: 16px;
}

.search-bar button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.search-bar button:hover {
    background-color: #0056b3;
}

.weather-display {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    margin: 20px auto;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.weather-display h2 {
    color: #333;
    margin-bottom: 10px;
}

.weather-icon img {
    width: 100px;
    height: 100px;
}

.temperature {
    font-size: 48px;
    font-weight: bold;
    color: #007bff;
    margin: 10px 0;
}

.description {
    font-size: 18px;
    color: #666;
    text-transform: capitalize;
    margin-bottom: 20px;
}

.weather-details {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.weather-details p {
    margin: 0;
    color: #555;
}

.loading-spinner {
    font-size: 24px;
    color: white;
    margin: 50px;
}

.error {
    color: white;
    background-color: #dc3545;
    padding: 15px;
    border-radius: 4px;
    margin: 20px auto;
    max-width: 400px;
}
```

## Explanation of Solution

### Container Component (WeatherContainer)
1. **State Management**: Uses four pieces of state - weather data, loading status, error messages, and current city
2. **Data Fetching**: The `fetchWeather` function handles API calls with proper error handling
3. **useEffect**: Fetches weather for default city (London) when component mounts
4. **Error Handling**: Catches API errors and displays user-friendly messages
5. **Conditional Rendering**: Shows different UI based on loading and error states

### Presentational Components

#### WeatherDisplay
- Receives weather data through props
- Destructures the weather object to extract needed data
- Displays all required information with proper formatting
- Uses weather icon from OpenWeatherMap API
- No state or data fetching - purely presentational

#### SearchBar
- Uses controlled input with local state
- Handles form submission to prevent page reload
- Clears input after successful search
- Passes search term up to parent via `onSearch` prop

#### LoadingSpinner
- Simple stateless component
- Shows loading message
- Could be enhanced with CSS animation

### Key Patterns Demonstrated

1. **Separation of Concerns**
   - Container handles all logic and state
   - Presentational components only handle display

2. **Props Flow**
   - Data flows down from container to presentational components
   - Events flow up through callback functions

3. **Error Boundary**
   - Graceful error handling with user feedback
   - App continues to function even with API errors

4. **Controlled Components**
   - SearchBar input is controlled by React state
   - Form submission is handled properly

## Testing Your Solution

To test if your solution works correctly:

1. **Initial Load**: Should display London weather by default
2. **Valid City Search**: Try "Paris", "New York", "Tokyo"
3. **Invalid City**: Try "zzzzz" - should show error message
4. **Empty Search**: Should not trigger API call
5. **Multiple Searches**: Should update display each time

## Common Issues and Fixes

1. **API Key Issues**: The 'demo' key might have limitations. In production, use a real API key from OpenWeatherMap
2. **CORS Errors**: If running locally, might need to configure proxy in package.json
3. **State Updates**: Remember React state updates are asynchronous
4. **Missing Dependencies**: Ensure all imports are correct

## Bonus Enhancements (Optional)

1. Add temperature unit toggle (Celsius/Fahrenheit)
2. Display more weather details (feels like, pressure, etc.)
3. Add weather forecast for next few days
4. Implement local storage to remember last searched city
5. Add animations for weather transitions