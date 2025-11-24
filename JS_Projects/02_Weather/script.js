document.addEventListener("DOMContentLoaded", () => {
  const cityName = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const divInfo = document.getElementById("weather-info");
  const infoCity = document.getElementById("city-name");
  const infoTemp = document.getElementById("temperature");
  const infoDesc = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_Key = "5f69c1963b41187ca0703fa80f8a3d92";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityName.value.trim();
    if (!city) return;

    try {
      let WeatherData = await fetchWeatherData(city);
      console.log(WeatherData);
      displayWeatherData(WeatherData);
    } catch {
      displayErrors();
    }
  });

  async function fetchWeatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
    let response = await fetch(URL);
    console.log(typeof response);
    console.log(response);

    if (!response.ok) {
      throw new console.error("Not a valid city");
    }
    let data = await response.json();
    return data;
  }

  function displayWeatherData(WeatherData) {
    const { name, main, weather } = WeatherData;
    infoCity.textContent = name;
    infoTemp.textContent = `TEMP ${main.temp}`;
    infoDesc.textContent = ` weather ${weather[0].description}`;

    divInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  } 

  function displayErrors() {
    divInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
