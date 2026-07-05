const myImg = document.getElementById("myWeatherImage");
const yourImg = document.getElementById("yourWeatherImage");

const myTemperature = document.getElementById("myTemperature");
const yourTemperature = document.getElementById("yourTemperature");

const myWindSpeed = document.getElementById("myWindSpeed");
const yourWindSpeed = document.getElementById("yourWindSpeed");

const myWeatherType = document.getElementById("myWeatherType");
const yourWeatherType = document.getElementById("yourWeatherType");

const yourHour = new Date().getHours();
const myHour = Number(new Intl.DateTimeFormat('pl-PL', {
    timeZone: "Europe/Warsaw",
    hour: "numeric",
    hour12: false,
}).format(new Date())
);

const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Rain showers",
    95: "Thunderstorm"
};

async function getYourWeather() {
    if (!navigator.geolocation){
        throw new Error("Geolocation disabled")
    }

    const position = await new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });

    const { latitude, longitude } = position.coords;

    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,weather_code,wind_speed_10m`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        units: data.current_units
    }
}

async function getMyWeather(){
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=50.049683` +
        `&longitude=19.944544` +
        `&current=temperature_2m,weather_code,wind_speed_10m`;

    const response = await fetch(url);
    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
        units: data.current_units
    };
}

function parseWeather(weather, hour) {
    const night = (hour < 20 || hour < 6) ? "" : " night";
    const weatherId = weather.weatherCode;
    const weatherName = weatherDescriptions[`${weatherId}`];
    const windy = weather.windSpeed > 24 && night === "" ? " windy" : "";
    if (weatherId <= 3){
        return weatherName+night+windy+".png";
    } else if (weatherId <= 74){
        return weatherName+".png";
    } else if (weatherId === 75) {
        return weatherName+windy+".png";
    } else if (weatherId <= 82) {
        return weatherName+night+".png";
    } else if (weatherId === 95) {
        return weatherName+".png";
    } else {
        return "na.png";
    }
}

function displayWeather(myWeatherValue, yourWeatherValue){
    const myWeather = parseWeather(myWeatherValue, myHour);
    myTemperature.innerHTML = myWeatherValue.temperature+"&#8451";
    myImg.src = `assets/images/weather/${myWeather}`;
    myWindSpeed.innerHTML = myWeatherValue.windSpeed + myWeatherValue.units.wind_speed_10m;
    myWeatherType.innerHTML = weatherDescriptions[`${myWeatherValue.weatherCode}`];

    if (yourWeatherValue != null) {
        const yourWeather = parseWeather(yourWeatherValue, yourHour);

        yourTemperature.innerHTML = yourWeatherValue.temperature + "&#8451";
        yourImg.src = `assets/images/weather/${yourWeather}`;
        yourWindSpeed.innerHTML = yourWeatherValue.windSpeed + yourWeatherValue.units.wind_speed_10m;
        yourWeatherType.innerHTML = weatherDescriptions[`${yourWeatherValue.weatherCode}`];
    }
}

const myWeather = await getMyWeather();
let yourWeather;
try {
    yourWeather = await getYourWeather();
} catch (error){
    yourTemperature.innerHTML = "N/A";
    yourImg.src = "assets/images/weather/na.png";
    yourWindSpeed.innerHTML = "N/A";
}
displayWeather(myWeather, yourWeather);
