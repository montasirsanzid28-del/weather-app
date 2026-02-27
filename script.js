// Weather App Configuration
const config = {
    apiKey: 'fd9da1f66789a327c94c926a129bd73c', // Your OpenWeatherMap API key
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    units: 'metric',
    lang: 'en'
};

// DOM Elements
const elements = {
    cityName: document.getElementById('city-name'),
    countryName: document.getElementById('country-name'),
    lastUpdated: document.getElementById('last-updated'),
    tempValue: document.getElementById('temp-value'),
    weatherIcon: document.getElementById('weather-icon'),
    weatherDesc: document.getElementById('weather-desc'),
    visibility: document.getElementById('visibility'),
    windSpeed: document.getElementById('wind-speed'),
    feelsLike: document.getElementById('feels-like'),
    humidity: document.getElementById('humidity'),
    forecastContainer: document.getElementById('forecast-container'),
    hourlyContainer: document.getElementById('hourly-container'),
    favoritesContainer: document.getElementById('favorites-container'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    locationBtn: document.getElementById('location-btn'),
    themeToggle: document.getElementById('theme-toggle'),
    clearFavorites: document.getElementById('clear-favorites'),
    loadingOverlay: document.getElementById('loading-overlay'),
    errorMessage: document.getElementById('error-message'),
    errorText: document.getElementById('error-text'),
    retryBtn: document.getElementById('retry-btn')
};

// State Management
let state = {
    currentWeather: null,
    favorites: [],
    currentLocation: null,
    isCelsius: true
};

// Utility Functions
const utils = {
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    },
    
    formatTime: (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    capitalizeFirst: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    getWeatherIcon: (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    },
    
    showLoading: () => {
        elements.loadingOverlay.classList.add('active');
    },
    
    hideLoading: () => {
        elements.loadingOverlay.classList.remove('active');
    },
    
    showError: (message) => {
        elements.errorText.textContent = message;
        elements.errorMessage.classList.add('active');
    },
    
    hideError: () => {
        elements.errorMessage.classList.remove('active');
    },
    
    saveToFavorites: (city) => {
        if (!state.favorites.find(fav => fav.name.toLowerCase() === city.name.toLowerCase())) {
            state.favorites.push(city);
            localStorage.setItem('weather_favorites', JSON.stringify(state.favorites));
            renderFavorites();
        }
    },
    
    removeFromFavorites: (cityName) => {
        state.favorites = state.favorites.filter(fav => fav.name.toLowerCase() !== cityName.toLowerCase());
        localStorage.setItem('weather_favorites', JSON.stringify(state.favorites));
        renderFavorites();
    },
    
    loadFavorites: () => {
        const saved = localStorage.getItem('weather_favorites');
        if (saved) {
            state.favorites = JSON.parse(saved);
            renderFavorites();
        }
    },
    
    toggleTemperatureUnit: () => {
        state.isCelsius = !state.isCelsius;
        if (state.currentWeather) {
            updateCurrentWeatherDisplay(state.currentWeather);
        }
        if (state.favorites.length > 0) {
            renderFavorites();
        }
    },
    
    convertTemperature: (temp) => {
        if (state.isCelsius) {
            return Math.round(temp);
        } else {
            return Math.round((temp * 9/5) + 32);
        }
    }
};

// API Functions
const api = {
    async getCurrentWeather(cityName) {
        try {
            console.log('Fetching weather for:', cityName);
            console.log('API Key:', config.apiKey);
            console.log('Request URL:', `${config.baseUrl}/weather?q=${encodeURIComponent(cityName)}&appid=${config.apiKey}&units=${config.units}&lang=${config.lang}`);
            
            const response = await fetch(`${config.baseUrl}/weather?q=${encodeURIComponent(cityName)}&appid=${config.apiKey}&units=${config.units}&lang=${config.lang}`);
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Weather data received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching current weather:', error);
            throw error;
        }
    },
    
    async getCurrentWeatherByCoords(lat, lon) {
        try {
            const response = await fetch(`${config.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${config.units}&lang=${config.lang}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching current weather by coords:', error);
            throw error;
        }
    },
    
    async getForecast(cityName) {
        try {
            const response = await fetch(`${config.baseUrl}/forecast?q=${encodeURIComponent(cityName)}&appid=${config.apiKey}&units=${config.units}&lang=${config.lang}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
    },
    
    async getForecastByCoords(lat, lon) {
        try {
            const response = await fetch(`${config.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${config.apiKey}&units=${config.units}&lang=${config.lang}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching forecast by coords:', error);
            throw error;
        }
    }
};

// Rendering Functions
function updateCurrentWeatherDisplay(data) {
    state.currentWeather = data;
    
    const temp = utils.convertTemperature(data.main.temp);
    const feelsLikeTemp = utils.convertTemperature(data.main.feels_like);
    
    elements.cityName.textContent = data.name;
    elements.countryName.textContent = data.sys.country;
    elements.tempValue.textContent = temp;
    elements.weatherIcon.src = utils.getWeatherIcon(data.weather[0].icon);
    elements.weatherIcon.alt = data.weather[0].description;
    elements.weatherDesc.textContent = utils.capitalizeFirst(data.weather[0].description);
    elements.visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    elements.windSpeed.textContent = `${data.wind.speed} m/s`;
    elements.feelsLike.textContent = `${feelsLikeTemp}°${state.isCelsius ? 'C' : 'F'}`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
    
    // Add to favorites if not already there
    utils.saveToFavorites({
        name: data.name,
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon
    });
}

function renderForecast(data) {
    elements.forecastContainer.innerHTML = '';
    
    // Group forecast by day
    const dailyData = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = {
                date: date,
                temp: item.main.temp,
                feels_like: item.main.feels_like,
                humidity: item.main.humidity,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                wind_speed: item.wind.speed,
                max_temp: item.main.temp,
                min_temp: item.main.temp
            };
        } else {
            // Update max/min temperatures
            if (item.main.temp > dailyData[dayKey].max_temp) {
                dailyData[dayKey].max_temp = item.main.temp;
            }
            if (item.main.temp < dailyData[dayKey].min_temp) {
                dailyData[dayKey].min_temp = item.main.temp;
            }
        }
    });
    
    // Render 5-day forecast
    const days = Object.values(dailyData).slice(0, 5);
    
    days.forEach(day => {
        const card = document.createElement('div');
        card.className = 'forecast-card fade-in';
        
        const maxTemp = utils.convertTemperature(day.max_temp);
        const minTemp = utils.convertTemperature(day.min_temp);
        
        card.innerHTML = `
            <div class="forecast-day">${utils.formatDate(day.date)}</div>
            <div class="forecast-icon">
                <img src="${utils.getWeatherIcon(day.icon)}" alt="${day.description}">
            </div>
            <div class="forecast-temp">${maxTemp}° / ${minTemp}°</div>
            <div class="forecast-desc">${utils.capitalizeFirst(day.description)}</div>
        `;
        
        card.addEventListener('click', () => {
            // You could implement detailed view here
            console.log('Clicked forecast for:', day.date);
        });
        
        elements.forecastContainer.appendChild(card);
    });
}

function renderHourlyForecast(data) {
    elements.hourlyContainer.innerHTML = '';
    
    // Show next 24 hours
    const hourlyData = data.list.slice(0, 24);
    
    hourlyData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'hourly-card fade-in';
        
        const temp = utils.convertTemperature(item.main.temp);
        
        card.innerHTML = `
            <div class="hourly-time">${utils.formatTime(item.dt * 1000)}</div>
            <div class="hourly-icon">
                <img src="${utils.getWeatherIcon(item.weather[0].icon)}" alt="${item.weather[0].description}">
            </div>
            <div class="hourly-temp">${temp}°</div>
        `;
        
        elements.hourlyContainer.appendChild(card);
    });
}

function renderFavorites() {
    elements.favoritesContainer.innerHTML = '';
    
    if (state.favorites.length === 0) {
        elements.favoritesContainer.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; color: var(--text-secondary); padding: var(--space-lg);">
                No saved locations yet. Search for a city to add it to your favorites!
            </div>
        `;
        return;
    }
    
    state.favorites.forEach(city => {
        const card = document.createElement('div');
        card.className = 'favorite-card fade-in';
        
        card.innerHTML = `
            <div class="favorite-info">
                <div class="favorite-icon">
                    <img src="https://openweathermap.org/img/wn/01d@2x.png" alt="Weather">
                </div>
                <div>
                    <div class="favorite-name">${city.name}, ${city.country}</div>
                    <div class="favorite-temp">Click to view weather</div>
                </div>
            </div>
            <button class="favorite-remove" onclick="removeFavorite('${city.name}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        card.addEventListener('click', () => {
            getWeatherByCity(city.name);
        });
        
        elements.favoritesContainer.appendChild(card);
    });
}

// Event Handlers
async function getWeatherByCity(cityName) {
    if (!cityName.trim()) {
        utils.showError('Please enter a city name');
        return;
    }
    
    utils.showLoading();
    utils.hideError();
    
    try {
        const [currentData, forecastData] = await Promise.all([
            api.getCurrentWeather(cityName),
            api.getForecast(cityName)
        ]);
        
        updateCurrentWeatherDisplay(currentData);
        renderForecast(forecastData);
        renderHourlyForecast(forecastData);
        
        // Save to search history
        saveSearchHistory(cityName);
        
    } catch (error) {
        console.error('Error:', error);
        if (error.message.includes('404')) {
            utils.showError(`City "${cityName}" not found. Please check the spelling and try again.`);
        } else if (error.message.includes('429')) {
            utils.showError('Too many requests. Please wait a moment and try again.');
        } else {
            utils.showError('Unable to fetch weather data. Please check your internet connection and try again.');
        }
    } finally {
        utils.hideLoading();
    }
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        utils.showError('Geolocation is not supported by this browser. Please search for a city manually.');
        // Try to show weather for a default city as fallback
        setTimeout(() => {
            getWeatherByCity('Dhaka');
        }, 2000);
        return;
    }
    
    utils.showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            
            try {
                const [currentData, forecastData] = await Promise.all([
                    api.getCurrentWeatherByCoords(latitude, longitude),
                    api.getForecastByCoords(latitude, longitude)
                ]);
                
                updateCurrentWeatherDisplay(currentData);
                renderForecast(forecastData);
                renderHourlyForecast(forecastData);
                
                // Save location for future use
                state.currentLocation = { lat: latitude, lon: longitude };
                localStorage.setItem('last_location', currentData.name);
                
            } catch (error) {
                console.error('Error:', error);
                utils.showError('Unable to get weather for your location. Please try searching for a city manually.');
                // Fallback to a default city
                setTimeout(() => {
                    getWeatherByCity('Dhaka');
                }, 2000);
            } finally {
                utils.hideLoading();
            }
        },
        (error) => {
            utils.hideLoading();
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    utils.showError('Location access denied. Please enable location services in your browser settings, or search for a city manually.');
                    // Fallback to a default city
                    setTimeout(() => {
                        getWeatherByCity('Dhaka');
                    }, 3000);
                    break;
                case error.POSITION_UNAVAILABLE:
                    utils.showError('Location information is unavailable. Please search for a city manually.');
                    // Fallback to a default city
                    setTimeout(() => {
                        getWeatherByCity('Dhaka');
                    }, 2000);
                    break;
                case error.TIMEOUT:
                    utils.showError('Location request timed out. Please search for a city manually.');
                    // Fallback to a default city
                    setTimeout(() => {
                        getWeatherByCity('Dhaka');
                    }, 2000);
                    break;
                default:
                    utils.showError('An unknown error occurred while getting your location. Please search for a city manually.');
                    // Fallback to a default city
                    setTimeout(() => {
                        getWeatherByCity('Dhaka');
                    }, 2000);
                    break;
            }
        }
    );
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('weather_theme', newTheme);
    
    // Update theme toggle icon
    const icon = elements.themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function removeFavorite(cityName) {
    utils.removeFromFavorites(cityName);
}

function clearAllFavorites() {
    if (confirm('Are you sure you want to remove all saved locations?')) {
        state.favorites = [];
        localStorage.setItem('weather_favorites', JSON.stringify(state.favorites));
        renderFavorites();
    }
}

function saveSearchHistory(cityName) {
    let history = JSON.parse(localStorage.getItem('search_history') || '[]');
    
    // Remove if already exists
    history = history.filter(city => city.toLowerCase() !== cityName.toLowerCase());
    
    // Add to beginning
    history.unshift(cityName);
    
    // Keep only last 10 searches
    history = history.slice(0, 10);
    
    localStorage.setItem('search_history', JSON.stringify(history));
}

// Initialize App
function init() {
    console.log('Weather app initializing...');
    console.log('API Key configured:', config.apiKey ? 'Yes' : 'No');
    console.log('Browser supports geolocation:', navigator.geolocation ? 'Yes' : 'No');
    
    // Load theme
    const savedTheme = localStorage.getItem('weather_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    const icon = elements.themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.className = 'fas fa-sun';
    }
    
    // Load favorites
    utils.loadFavorites();
    
    // Event Listeners
    elements.searchBtn.addEventListener('click', () => {
        getWeatherByCity(elements.searchInput.value);
    });
    
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeatherByCity(elements.searchInput.value);
        }
    });
    
    elements.locationBtn.addEventListener('click', getWeatherByLocation);
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.clearFavorites.addEventListener('click', clearAllFavorites);
    elements.retryBtn.addEventListener('click', () => {
        utils.hideError();
        if (state.currentLocation) {
            getWeatherByLocation();
        } else if (state.favorites.length > 0) {
            getWeatherByCity(state.favorites[0].name);
        }
    });
    
    // Initialize with a default city or user's location
    const savedLocation = localStorage.getItem('last_location');
    if (savedLocation) {
        getWeatherByCity(savedLocation);
    } else {
        // Try to get user's location
        getWeatherByLocation();
    }
}

// Handle temperature unit toggle
document.addEventListener('keydown', (e) => {
    if (e.key === 'c' || e.key === 'C') {
        utils.toggleTemperatureUnit();
    }
});

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);