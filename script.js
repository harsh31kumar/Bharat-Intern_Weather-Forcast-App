const apiKey = "73a3b998c7bb3e2ccd36941a4926fa0e";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-info").style.display = "none";
  } else {
    var data = await response.json();
    var timestamp = data.sys.sunset;
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var AmOrPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    var minutes = date.getMinutes();
    var finalTime = hours + ":" + minutes + " " + AmOrPm;
    var unix =
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear();
    console.log(unix);

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".wind").innerHTML = data.wind.speed;
    document.querySelector(".humid").innerHTML = data.main.humidity;
    document.querySelector(".feeling").innerHTML = Math.round(
      data.main.feels_like
    );
    document.querySelector(".sunset").innerHTML = finalTime + " " + unix;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.className = "bi bi-cloud-sun";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.className = "bi bi-brightness-high";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.className = "bi bi-cloud-rain";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.className = "bi bi-cloud-drizzle";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.className = "bi bi-cloud-haze2";
    }
    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});