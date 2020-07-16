/**
 * Global Variable
 */
const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather_text = document.querySelector(".js-weather .weather_text");

/**
 * Functions
 */
function init() {
    load_weather();
}
 
function load_weather() {
    const current_coords = localStorage.getItem("coords");
    if (current_coords !== null) {
        const parsed_coords = JSON.parse(current_coords);
        get_weather(parsed_coords);
        return;
    } else {
        navigator.geolocation.getCurrentPosition(handle_geo_success, handle_geo_failure); // navigator?
    }
  }

function get_weather(coords) {
    fetch(
        `${WEATHER_API}lat=${coords.lat}&lon=${
            coords.lng
        }&appid=${API_KEY}&units=metric`
    )
        .then(response => response.json())
        .then(json => {
            const name = json.name;
            const temperature = json.main.temp;
            weather_text.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
    });
}

function handle_geo_success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const coords = {
        lat : lat,
        lng : lng
    };
    localStorage.setItem("coords", JSON.stringify(coords));
    get_weather(coords);
}

function handle_geo_failure() {
  console.log("no location");
}


init();