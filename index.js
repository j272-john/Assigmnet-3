function refreshWeather(currentWeather) {
  // Update the current temperature value
  let currentTemperatureValue = document.querySelector("#current-temperature-value");
  currentTemperatureValue.innerHTML = Math.round(currentWeather.data.temperature.current); // round the temperature

  // Update weather description
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = currentWeather.data.condition.description; // corrected the typo

  // Update the weather icon
  let currentWeatherIcon = document.querySelector("#weather-app-icon");
  currentWeatherIcon.innerHTML = `<img src="${currentWeather.data.condition.icon_url}" alt="Weather icon not loading" class="weather-app-icon" />`;

  // Update humidity
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${currentWeather.data.temperature.humidity}%`;

  // Update wind speed
  let windSpeed = document.querySelector("#windspeed");
  windSpeed.innerHTML = `${currentWeather.data.wind.speed} knots`;

  // Update current time
  let currentTime = document.querySelector("#current-me");
  let date = new Date(currentWeather.data.time * 1000); // convert Unix timestamp to Date object
  currentTime.innerHTML = formatDate(date); // call the formatDate function to display the time
}

// Function to format the date (time of the weather report)
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  let day = days[date.getDay()]; // Get the name of the day
  if (minutes < 10) { minutes = `0${minutes}`; } // Add leading zero to minutes if needed
  return `${day} ${hours}:${minutes}`; // Format time as "Day Hours:Minutes"
}

// Function to search for weather data based on city name
function searchCity(currentCityName) {
  let apiKey = "73dof19a030ad06t05b21e8521b4860f"; // Your API key (replace with actual key if needed)
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCityName}&key=${apiKey}`; // URL for the weather API

  // Make the API request using axios and then call the refreshWeather function
  axios.get(apiUrl).then(refreshWeather).catch(function(error) {
    console.error("Error fetching the weather data: ", error);
  });
}

// Function to handle the city search form submission
function displayCity(event) {
  event.preventDefault(); // Prevent form submission

  // Get the city name entered by the user
  let cityName = document.querySelector("#city-name").value;

  // Update the displayed city name in the UI
  let cityNamedisplayed = document.querySelector("h3");
  cityNamedisplayed.innerHTML = cityName;

  // Call the searchCity function with the entered city name
  searchCity(cityName);
}

// Attach the event listener to the form submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", displayCity);
