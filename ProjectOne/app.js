// script.js
document.addEventListener("DOMContentLoaded", () => {
    //const locationInput = document.getElementById("locationInput");
    const fetchWeatherButton = document.getElementById("fetchWeather");
    //const weatherInfo = document.getElementById("weatherInfo");
    console.log(fetchWeatherButton);
    fetchWeatherButton.addEventListener("click", () => {
        getCoordintes()
        console.log('clicked');
        //const location = locationInput.value;
        // Replace 'YOUR_API_KEY' with your actual API key
        // const apiKey = 'YOUR_API_KEY';
        // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    });
});

function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // const temperature = data.main.temp;
                // const description = data.weather[0].description;

                // weatherInfo.innerHTML = `<p>Temperature: ${temperature}°C</p><p>Description: ${description}</p>`;
                console.log(data)
                const weathercode = data.current_weather.weathercode

                switch (weathercode) {
                    case 0:
                        document.getElementById("songClearSky").classList.remove("hide")
                        document.getElementById("songClearSky").classList.add("show")
                        return "ClearSky";

                    case 1:
                    case 2:
                    case 3:
                    case 45:
                    case 48:
                        document.getElementById("songOvercastFoggy").classList.remove("hide")
                        document.getElementById("songOvercastFoggy").classList.add("show")
                        return "OvercastFoggy";

                    case 51:
                    case 53:
                    case 55:
                    case 56:
                    case 57:
                        document.getElementById("songDrizzle").classList.remove("hide")
                        document.getElementById("songDrizzle").classList.add("show")
                        return "Drizzle";

                    case 61:
                    case 63:
                    case 65:
                    case 66:
                    case 67:
                    case 80:
                    case 81:
                    case 82:
                        document.getElementById("songRain").classList.remove("hide")
                        document.getElementById("songRain").classList.add("show")
                        return "Rain";

                    case 71:
                    case 73:
                    case 75:
                    case 77:
                    case 85:
                    case 86:
                        document.getElementById("songSnow").classList.remove("hide")
                        document.getElementById("songSnow").classList.add("show")
                        return "Snow";

                    case 95:
                    case 96:
                    case 99:
                        document.getElementById("songThunderstorm").classList.remove("hide")
                        document.getElementById("songThunderstorm").classList.add("show")
                        return "Thunderstorm";

                    default:
                        return "Unknown weather code";
                }
            })
            .catch((error) => {
                console.log(error)
                //weatherInfo.innerHTML = "Unable to fetch weather data.";
            });
        //getCity(coordinates);
        return;

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

