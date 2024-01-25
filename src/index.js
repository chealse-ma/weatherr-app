function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let conditionELement = document.querySelector("#current-condition");
  let date = new Date();
  let timeElement = document.querySelector("#current-time");
  let amPm = date.toLocaleTimeString([], { timeStyle: "short" });
  let dayElement = document.querySelector("#current-day");
  let icon = document.querySelector("#current-weather-icon");
  let humidity = response.data.temperature.humidity;
  let humidityElement = document.querySelector("#humidity");
  let windSpeed = response.data.wind.speed;
  let windSpeedElement = document.querySelector("#wind-speed");

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  conditionELement.innerHTML = response.data.condition.description;
  timeElement.innerHTML = amPm;
  dayElement.innerHTML = formatDate(date);
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${windSpeed} mph`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];

  return day;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "443o50f2b2b7f52caatbcb5a0d99f0f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchInput);

function getForecast(city) {
  let apiKey = "443o50f2b2b7f52caatbcb5a0d99f0f6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
                <div class="weather-forecast-date">${formatDay(day.time)}</div>
                <img src="${day.condition.icon_url}" alt="" width="70px">
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    day.temperature.maximum
                  )}°</span> 
                  <span class="weather-forecast-temperature-min">${Math.round(
                    day.temperature.minimum
                  )}°</span>
                </div>
              </div>
              `;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

searchCity("London");
