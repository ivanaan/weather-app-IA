let now = new Date();
let dateTime = document.querySelector("#dateTime");

let time = now.getHours();
let min = now.getMinutes();
if (min < 10) {
  min = "0" + min;
} else {
  min = min + "";
}
if (time < 10) {
  time = "0" + time;
} else {
  time = time + "";
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
dateTime.innerHTML = `${day}, ${time}:${min}`;
let today = now.getDate();
date.innerHTML = `${today}`;
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
thisMonth.innerHTML = `${month}`;

function showTemp(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#main-temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector(Math.round("#wind"));
  wind.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.sys.country;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  function showCelsius() {
    let celsius = Math.round(response.data.main.temp);
    temperature.innerHTML = celsius;
  }
  function showFahrenheit() {
    let fahren = Math.round((response.data.main.temp * 9) / 5 + 32);
    temperature.innerHTML = fahren;
  }
  let tempCelsius = document.querySelector("#celsius");
  tempCelsius.addEventListener("click", showCelsius);
  let tempFahren = document.querySelector("#fahren");
  tempFahren.addEventListener("click", showFahrenheit);
}
function searchCity(event) {
  event.preventDefault();
  let getCity = document.querySelector("#city-input");

  let newCity = document.querySelector("#city");
  newCity.innerHTML = `${getCity.value}`;

  let apiKey = `d2d01f1fc5b19f7fc7e281964337ff35`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${getCity.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemp);
}

let theCity = document.querySelector("#city-form");
theCity.addEventListener("submit", searchCity);

function getCurrentCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `d2d01f1fc5b19f7fc7e281964337ff35`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentTemp() {
  navigator.geolocation.getCurrentPosition(getCurrentCoords);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentTemp);
