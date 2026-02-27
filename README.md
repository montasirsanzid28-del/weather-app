# WeatherSphere - Global Weather Tracker

A beautiful, responsive weather application that provides real-time weather information from around the world with an intuitive interface designed for both mobile and desktop users.

## Features

### 🌍 **Global Weather Coverage**
- Real-time weather data from OpenWeatherMap API
- Supports any city worldwide
- Current weather conditions with detailed metrics

### 📱 **Responsive Design**
- Optimized for mobile, tablet, and desktop
- Touch-friendly interface
- Adaptive layouts that work on any screen size

### ⚡ **Rich Functionality**
- 5-day weather forecast
- Hourly weather predictions
- Current weather with detailed metrics (humidity, wind, visibility, feels-like temperature)
- Search by city name
- Automatic location detection
- Temperature unit toggle (Celsius/Fahrenheit)

### 💫 **User Experience**
- Dark/light theme toggle
- Favorite locations saving
- Search history
- Beautiful animations and transitions
- Loading states and error handling

### 🔧 **Technical Features**
- Vanilla JavaScript (no frameworks)
- CSS Grid and Flexbox for layouts
- Local storage for user preferences
- Geolocation API integration
- Comprehensive error handling

## Screenshots

### Desktop View
- Clean, modern interface with large weather cards
- Side-by-side current weather and forecast display
- Comprehensive weather details

### Mobile View
- Optimized single-column layout
- Touch-friendly controls
- Compact yet informative design

## Setup Instructions

### 1. Get Your API Key
To use this weather app, you'll need a free API key from OpenWeatherMap:

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to your API keys section
4. Copy your API key

### 2. Configure the App
1. Open `script.js` in your preferred code editor
2. Find the configuration section at the top:
   ```javascript
   const config = {
       apiKey: 'YOUR_API_KEY_HERE', // Replace with your OpenWeatherMap API key
       baseUrl: 'https://api.openweathermap.org/data/2.5',
       units: 'metric',
       lang: 'en'
   };
   ```
3. Replace `'YOUR_API_KEY_HERE'` with your actual API key

### 3. Run the App
The app is completely static and can be run directly in any modern browser:

1. **Option 1: Direct File Opening**
   - Double-click `index.html` to open it in your default browser

2. **Option 2: Local Server (Recommended)**
   - Navigate to the project directory in your terminal
   - Run a simple HTTP server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have http-server installed)
     npx http-server -p 8000
     
     # PHP
     php -S localhost:8000
     ```
   - Open your browser and go to `http://localhost:8000`

## Usage Guide

### Getting Started
1. **Automatic Location**: The app will automatically try to detect your location on first load
2. **Search for Cities**: Use the search bar to find weather for any city worldwide
3. **Save Favorites**: Click on any searched city to add it to your favorites list

### Key Features

#### Current Weather
- **Temperature**: Current temperature with feels-like indicator
- **Weather Icon**: Visual representation of current conditions
- **Details**: Humidity, wind speed, visibility, and weather description
- **Location**: City name and country code

#### 5-Day Forecast
- Daily weather predictions for the next 5 days
- High/low temperature ranges
- Weather conditions and icons
- Click on any day for more details (expandable)

#### Hourly Forecast
- Next 24 hours of weather predictions
- Hourly temperature changes
- Perfect for planning your day

#### Favorites System
- Save your frequently checked locations
- Quick access to weather for multiple cities
- Persistent storage using browser's local storage

#### Theme System
- Toggle between light and dark themes
- Automatic theme persistence
- Eye-friendly dark mode for nighttime use

### Keyboard Shortcuts
- **C**: Toggle temperature units (Celsius/Fahrenheit)
- **Enter**: Search for the city in the search bar

### Mobile Features
- **Touch-optimized**: All controls work perfectly with touch
- **Swipe-friendly**: Scroll through forecasts and hourly data
- **Compact design**: All features accessible on small screens

## API Usage

The app uses the following OpenWeatherMap API endpoints:

- **Current Weather**: `/weather` - Provides current conditions
- **5-Day Forecast**: `/forecast` - Provides 3-hour interval forecasts for 5 days

### Rate Limits
- Free tier: 60 calls per minute
- The app is optimized to minimize API calls
- Data is cached locally when possible

### Error Handling
The app includes comprehensive error handling for:
- Invalid API keys
- Network connectivity issues
- Rate limit exceeded
- Invalid city names
- Geolocation permission denied

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Features**: Requires modern JavaScript (ES6+) and Fetch API

## Customization

### Colors and Theme
Edit the CSS variables in `style.css` to customize the color scheme:
```css
:root {
    --accent-color: #007bff;  /* Primary color */
    --bg-color: #f8f9fa;      /* Background color */
    /* ... more variables */
}
```

### Typography
The app uses Google Fonts (Inter). You can change the font family in the CSS:
```css
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### API Configuration
Modify the `config` object in `script.js` to change:
- Temperature units (metric/imperial)
- Language settings
- API endpoints

## Troubleshooting

### Common Issues

**"City not found" Error**
- Check spelling of the city name
- Try adding the country code (e.g., "London, UK")
- Ensure you have a valid API key

**"Unable to get location" Error**
- Ensure location services are enabled in your browser
- Check that you've granted location permissions
- Some browsers may block geolocation on insecure connections (HTTP)

**No Weather Data**
- Verify your API key is correct
- Check your internet connection
- Ensure you haven't exceeded the API rate limit

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is valid
3. Ensure you're using a modern browser with JavaScript enabled

## Contributing

This is a personal project, but if you'd like to suggest improvements:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your changes

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **OpenWeatherMap**: For providing the weather API
- **Font Awesome**: For the beautiful icons
- **Google Fonts**: For the Inter font family

## Future Enhancements

Potential features for future versions:
- Weather alerts and notifications
- Air quality index
- UV index
- Precipitation probability
- Weather maps and radar
- Multi-city dashboard view
- Weather widgets
- Offline functionality

---

**WeatherSphere** - Your window to the world's weather, designed with care and precision. 🌤️