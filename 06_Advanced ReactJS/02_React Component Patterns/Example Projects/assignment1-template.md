# Assignment 1: Weather Dashboard

## Objective
Create a weather dashboard application using the Container-Presentational pattern. The container component will fetch weather data from an API, and presentational components will display the information.

## Requirements

### Part 1: Container Component (WeatherContainer.jsx)
Create a container component that:
1. Manages state for weather data, loading status, and errors
2. Fetches weather data from the API (URL provided below)
3. Handles user input for city search
4. Passes data to presentational components

### Part 2: Presentational Components
Create these presentational components:

1. **WeatherDisplay.jsx**
   - Receives weather data as props
   - Displays temperature, description, humidity, and wind speed
   - Shows weather icon based on weather condition

2. **SearchBar.jsx**
   - Receives onSearch function as prop
   - Has a controlled input for city name
   - Has a search button

3. **LoadingSpinner.jsx**
   - Simple loading indicator
   - No props needed

### API Information
Use this API endpoint:
```
https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid=demo&units=metric
```
Note: Replace {CITY_NAME} with the actual city name. The 'demo' API key is for testing purposes.

### Starter Code Structure

```jsx
// App.jsx
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

```jsx
// components/WeatherContainer.jsx
import { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

const WeatherContainer = () => {
    // TODO: Add state for weather data, loading, error, and city
    
    // TODO: Create fetchWeather function
    
    // TODO: Use useEffect to fetch weather for default city (e.g., "London")
    
    // TODO: Create handleSearch function
    
    // TODO: Implement conditional rendering for loading and error states
    
    // TODO: Return JSX with SearchBar and WeatherDisplay
};

export default WeatherContainer;
```

```jsx
// components/WeatherDisplay.jsx
const WeatherDisplay = ({ weather }) => {
    // TODO: Display weather information
    // Should show: city name, temperature, description, humidity, wind speed
    
    return (
        <div className="weather-display">
            {/* Your code here */}
        </div>
    );
};

export default WeatherDisplay;
```

```jsx
// components/SearchBar.jsx
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    // TODO: Add controlled input state
    
    // TODO: Handle form submission
    
    return (
        <form className="search-bar">
            {/* Your code here */}
        </form>
    );
};

export default SearchBar;
```

```jsx
// components/LoadingSpinner.jsx
const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            Loading...
        </div>
    );
};

export default LoadingSpinner;
```

### Sample API Response
```json
{
    "name": "London",
    "main": {
        "temp": 15.5,
        "humidity": 72
    },
    "weather": [
        {
            "description": "light rain",
            "icon": "10d"
        }
    ],
    "wind": {
        "speed": 3.5
    }
}
```

### Basic Styling (App.css)
```css
.App {
    text-align: center;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.search-bar {
    margin: 20px 0;
}

.search-bar input {
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.search-bar button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.weather-display {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 400px;
}

.loading-spinner {
    font-size: 20px;
    color: #007bff;
    margin: 20px;
}

.error {
    color: red;
    margin: 20px;
}
```

## Grading Criteria

1. **Container Component (40 points)**
   - Properly manages state (10 points)
   - Correctly fetches data from API (10 points)
   - Handles errors appropriately (10 points)
   - Passes props correctly to children (10 points)

2. **Presentational Components (40 points)**
   - WeatherDisplay correctly displays all data (15 points)
   - SearchBar handles input and submission (15 points)
   - Components are truly presentational (no data fetching) (10 points)

3. **Functionality (20 points)**
   - App loads with default city weather (5 points)
   - Search functionality works (10 points)
   - Error states are handled gracefully (5 points)

## Hints
- Remember to use the spread operator for state updates
- The API might return an error for invalid city names - handle this!
- Use conditional rendering with && or ternary operators
- Keep your presentational components pure - they should only receive and display data

## Submission
Submit all component files and your App.css file. Make sure your app runs without errors!