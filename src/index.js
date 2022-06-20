let now = new Date();
let h3 = document.querySelector("#date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dates = now.getDate();
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
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
let day = days[now.getDay()];
h3.innerHTML = `${day} ${month} ${dates},</br> ${hours}:${minutes}`;

// Search Engine

function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperatures").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h2").innerHTML = response.data.weather[0].main;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("src", `images/${cityIcon}.png`);
}

function displaySearch(city) {
  let apiKey = "2ea3d5c448ee04a93aeb4cdc1266a089";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  displaySearch(searchInput.value);
}

function currentLocation(position) {
  let apiKey = "2ea3d5c448ee04a93aeb4cdc1266a089";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(geolocationUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

displaySearch("Philadelphia");
