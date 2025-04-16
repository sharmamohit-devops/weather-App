
    const weatherForm = document.querySelector(".WeatherForm");
    const CityInput = document.querySelector(".CityInput");
    const Card = document.querySelector(".Card");
    const apikey = "af8e7cd1e74d16be8175e44affd5e762";
    weatherForm.addEventListener("click", async (event) => {
      event.preventDefault();
      const City = CityInput.value;
      if (City) {
        try {
          const weatherData = await getweatherData(City);
          displayWeatherInfo(weatherData);
        } catch (error) {
          alert("City not found. Please check the spelling and try again.");

          console.log(error.message);
        }
      }
    });
    async function getweatherData(City) {
      const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apikey}`;
      const response = await fetch(apiurl);
      if (!response.ok) {
        throw new Error("could not fetch weather data");
      }
      return await response.json();
    }
    function displayWeatherInfo(Data) {
      console.log(Data);
      const {
        name: City,
        main: { temp, humidity },
        weather: [{ description, id }],
      } = Data;
      Card.textContent = "";
      Card.style.display = "flex";
      const CityDisplay = document.createElement("h1");
      const tempDisplay = document.createElement("p");
      const humidityDisplay = document.createElement("p");
      const descDisplay = document.createElement("p");
      const weatherEmoji = document.createElement("p");

      CityDisplay.textContent = City;
      tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
      humidityDisplay.textContent = `Humidity: ${humidity}%`;
      descDisplay.textContent = description;
      weatherEmoji.textContent = getWeatherEmoji(id);

      CityDisplay.classList.add("CityDisplay");
      tempDisplay.classList.add("tempDisplay");
      humidityDisplay.classList.add("humidityDisplay");
      descDisplay.classList.add("descDisplay");
      weatherEmoji.classList.add("weatherEmoji");
      Card.appendChild(CityDisplay);
      Card.appendChild(tempDisplay);
      Card.appendChild(humidityDisplay);
      Card.appendChild(descDisplay);
      Card.appendChild(weatherEmoji);
    }
    function getWeatherEmoji(weatherId) {
      switch (true) {
        case weatherId >= 200 && weatherId < 300:
          return "⛈️";
        case weatherId >= 300 && weatherId < 400:
          return "🌧️";
        case weatherId >= 500 && weatherId < 600:
          return "🌦️";
        case weatherId >= 600 && weatherId < 700:
          return "❄️";
        case weatherId >= 700 && weatherId < 800:
          return "💨";
        case weatherId === 800:
          return "🌞";
        case weatherId >= 801 && weatherId < 810:
          return "☁️";
        default:
          return "";
      }
    }
  
