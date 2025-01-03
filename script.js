window.onload = (event) => {
  const API_KEY = "9958769a204dbd8c35f4a0b4a556a9c7";
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,UnitedKingdom&units=metric&appid=${API_KEY}`;

  const heroText = document.getElementById("hero-text");
  const visibility = document.getElementById("visibility");
  const temp = document.getElementById("temperature");

  const fetchWeatherData = () => {
    fetch(weatherAPIUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let city = data.name;
        let cityVisibility = data.weather[0].description;
        let cityTemp = data.main.temp;

        const timeNow = Date.now();
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;

        heroText.innerHTML = city;
        visibility.innerHTML = cityVisibility;
        temp.innerHTML = `${Math.round(cityTemp)}<span>°C</span>`;

        console.log((timeNow - sunrise) / 1000 / 3600);
      });
  };

  fetchWeatherData();
};
