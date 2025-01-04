window.onload = (event) => {
  const API_KEY = "9958769a204dbd8c35f4a0b4a556a9c7";
  const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,UnitedKingdom&units=metric&appid=${API_KEY}`;
  const weatherAPINextDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=London,UnitedKingdom&units=metric&appid=${API_KEY}`;

  const heroText = document.getElementById("hero-text");
  const visibility = document.getElementById("visibility");
  const temp = document.getElementById("temperature");
  const sunrise = document.getElementById("sunrise");
  const sunset = document.getElementById("sunset");
  const dayContainer = document.getElementById("daily-breakdown");
  const dayNightImg = document.getElementById("hero-img");
  const gradientHero = document.getElementById("hero-gradient");

  const sunImg = "./img/sun.png";
  const sunCloudImg = "./img/sun-cloud.png";
  const cloudImg = "./img/cloud.png";
  const moonImg = "./img/moon.png";
  const moonStarImg = "./img/moon-stars.png";

  const dayOrNight = (weather, sunset) => {
    const time = new Date().getHours();

    if (sunset <= time) {
      dayNightImg.src = moonStarImg;
      gradientHero.style.background = "linear-gradient(#6264A2, #222350)";
    } else if (weather === "Rain") {
      dayNightImg.src = sunCloudImg;
    } else if (weather === "Clouds" || weather === "Snow") {
      dayNightImg.src = cloudImg;
    } else {
      dayNightImg.src = sunImg;
    }
  };

  const dailyWeather = (weather) => {
    if (weather === "Rain") {
      return sunCloudImg;
    } else if (weather === "Clouds") {
      return cloudImg;
    } else {
      return sunImg;
    }
  };

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

        dayOrNight(data.weather[0].main, timeOfSunset.split(":")[0]);

        console.log(timeOfSunset.split(":")[0]);
        console.log(data);
      });
  };

  fetchWeatherData();

  const fetchNextDaysTemp = () => {
    fetch(weatherAPINextDayUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredWeatherData = data.list.filter((item) =>
          item.dt_txt.endsWith("12:00:00")
        );

        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const filteredWithDays = filteredWeatherData.map((item) => {
          const date = new Date(item.dt_txt);
          const day = daysOfWeek[date.getDay()];
          return {
            ...item,
            dayOfWeek: day,
          };
        });

        const dailySummary = filteredWithDays.map((day) => {
          let weekday = day.dayOfWeek;
          let temp = day.main.temp;
          let condition = day.weather[0].main;
          // console.log(day.weather[0].main);
          return `
            <div class="day-breakdown">
              <p>${weekday}</p>
              <img width="auto" height="20" src="${dailyWeather(
                day.weather[0].main
              )}" />
              <p class=temp>${Math.round(temp)}°C</p> 
            </div>
          `;
        });

        dayContainer.innerHTML = dailySummary.join("");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  fetchNextDaysTemp();
};
