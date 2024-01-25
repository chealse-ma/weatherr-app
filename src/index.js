function updateWeatherData(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class= "weather-icon"></img>`;

  let tempElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  tempElement.innerHTML = Math.round(temperature);

  let timeElement = document.querySelector("#current-time");
  let timeStamp = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(timeStamp);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}

function formatDate(timeStamp) {
  let minutes = timeStamp.getMinutes();
  let hours = timeStamp.getHours();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satirday",
  ];

  let day = weekdays[timeStamp.getDay()];
  return `${day} ${hours}:${minutes}`;

  if (minutes > 10) {
    minutes = `0${minutes}`;
  }
}

function searchCityName(city) {
  let apiKey = "b4695dbeo3231b4ta37cdcd77c20d1fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function updateCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInput.value;
  searchCityName(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", updateCityName);

searchCityName("Edinburgh");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return weekdays[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (weekday, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
      <div class="forecast-date">${formatDay(weekday.time)}</div>
   
      <img src="${weekday.condition.icon_url}" class="forecast-icon"  />
     
      <div class="forecast-temperatures">
        <div class="highest-temperature">${Math.round(
          weekday.temperature.maximum
        )}°</div>
        <div class="lowest-temperature">${Math.round(
          weekday.temperature.minimum
        )}°</div>
      </div>
  </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "b4695dbeo3231b4ta37cdcd77c20d1fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
