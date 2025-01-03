window.onload = (event) => {
  const API_KEY = "9958769a204dbd8c35f4a0b4a556a9c7";
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,UnitedKingdom&units=metric&appid=${API_KEY}`;

  const heroText = document.getElementById("hero-text");
  const visibility = document.getElementById("visibility");
  const temp = document.getElementById("temperature");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");

  const calculateTime = (time) => {
    const sunTimestamp = time;
    const sunTimeMilliseconds = sunTimestamp * 1000;
    const sunDate = new Date(sunTimeMilliseconds);
    const hours = sunDate.getHours();
    const minutes = sunDate.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;

    return formattedTime;
  };

  const fetchWeatherData = () => {
    fetch(weatherAPIUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let city = data.name;
        let cityVisibility = data.weather[0].description;
        let cityTemp = data.main.temp;
        let timeOfSunrise = calculateTime(data.sys.sunrise);
        let timeOfSunset = calculateTime(data.sys.sunset);

        heroText.innerHTML = city;
        visibility.innerHTML = cityVisibility;
        temp.innerHTML = `${Math.round(cityTemp)}<span>°C</span>`;
        sunrise.innerHTML = timeOfSunrise;
        sunset.innerHTML = timeOfSunset;

        console.log(data);
      });
  };

  fetchWeatherData();
};
