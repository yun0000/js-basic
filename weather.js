const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "5099525af708b4a32c6b3ba102e30a80";


function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function (response) {
            return response.json();
        }) .then(function (json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${place} ${temperature}`
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handelGeoError() {
    console.log("can't access geo");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handelGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();