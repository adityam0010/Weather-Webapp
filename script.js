// Global constants for API key and API URL
const apiKey = "28d33d6e1227ecbc848f35901480a1b7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Global constants for event listeners/input
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const intUnits = document.querySelector(".slider input");
const description = document.querySelector(".description");

// Global variable to store weather data
let currentWeatherData = null;

// Asynchronous function to gather data for input city
async function checkWeather(city) {
    // Gather results from API using the city name and API key
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Input validation for city name
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".slider").style.display = "none";
    } else {
        // Parse the JSON response and store it in the global variable
        currentWeatherData = await response.json();

        // Update the weather display
        updateWeatherDisplay();
    }
}

// Function to update weather display based on data and unit toggle
function updateWeatherDisplay() {
    if (!currentWeatherData) return;

    const tempCelsius = currentWeatherData.main.temp; // Celsius temperature
    const tempFahrenheit = (tempCelsius * 1.8) + 32; // Convert Celsius to Fahrenheit
    const windKmh = currentWeatherData.wind.speed; // Wind speed in km/h
    const windMph = windKmh * 0.621371; // Convert km/h to mph

    // Update text content dynamically
    document.querySelector(".city").innerHTML = currentWeatherData.name;
    document.querySelector(".humidity").innerHTML = currentWeatherData.main.humidity + "%";
    description.innerHTML = currentWeatherData.weather[0].description; // Add weather description

    // Toggle units based on checkbox state
    if (intUnits.checked) {
        document.querySelector(".temp").innerHTML = parseInt(tempFahrenheit) + " &deg;F";
        document.querySelector(".wind").innerHTML = windMph.toFixed(1) + " MPH";
    } else {
        document.querySelector(".temp").innerHTML = parseInt(tempCelsius) + " &deg;C";
        document.querySelector(".wind").innerHTML = windKmh.toFixed(1) + " KM/H";
    }

    // Update weather icon and background image based on condition
    const weatherType = currentWeatherData.weather[0].main;
    switch (weatherType) {
        case "Clouds":
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png"; // Cloud icon
            document.body.style.backgroundImage = "url('https://th.bing.com/th?id=OIP.nkhWBdmhwy5R6uuHudqhUwHaFS&w=295&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2')";
            break;
        case "Clear":
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Sun icon
            document.body.style.backgroundImage = "url('https://th.bing.com/th?id=OIP.e1Dij42QESa1S5O1guiEzgHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2')";
            break;
        case "Rain":
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1183/1183672.png"; // Rain icon
            document.body.style.backgroundImage = "url('https://th.bing.com/th?id=OIP.OwjBEKd5VZ91vEbNPdS7wwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2)";
            break;
        case "Drizzle":
        case "Mist":
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414823.png"; // Mist icon
            document.body.style.backgroundImage = "url('https://th.bing.com/th?id=OIP.HvkWzdA3Ngji4f-E-plAZgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2')";
            break;
        case "Snow":
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/414/414927.png"; // Snow icon
            document.body.style.backgroundImage = "url('https://th.bing.com/th?id=OIP.3dgNZ3U4-V27QTsBEBGkPwHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2')";
            break;
        case "Haze":
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3313/3313917.png"; // Haze icon
            document.body.style.backgroundImage = "url('https://th.bing.com/th/id/OIP.8rMNs8i8h0hvW0Ut1ubTAAHaEK?w=287&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')";
            break;    
        default:
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Default sun icon
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29')";
    }

    // Display weather and slider, hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".slider").style.display = "flex";
    document.querySelector(".error").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    // Set default background when the page loads
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29')";
});


// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for international units toggle button
intUnits.addEventListener("click", () => {
    updateWeatherDisplay();
});
