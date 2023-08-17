document.addEventListener("DOMContentLoaded", () => {
    let city = prompt("Enter your city to get the weather forecast:");
    if (!city) {
        city = "London";  // Default to London if no city is provided
    }
    fetchWeather(city);
});

document.querySelector(".loc-button").addEventListener("click", () => {
    const city = prompt("Enter the city name:");
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const apiKey = 'db5a7eb2ab9331bc2183ecf91a5541b8';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const todayData = data.list[0];
            
            document.querySelector('.today-info h2').innerText = new Date(todayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
            document.querySelector('.today-info span').innerText = new Date(todayData.dt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
            document.querySelector('.today-info div span').innerText = `${data.city.name}, ${data.city.country}`;
            document.querySelector('.today-weather i').className = getWeatherIconClass(todayData.weather[0].main);
            document.querySelector('.weather-temp').innerText = `${Math.round(todayData.main.temp)}°C`;
            document.querySelector('.today-weather h3').innerText = todayData.weather[0].description.charAt(0).toUpperCase() + todayData.weather[0].description.slice(1);

            const daysList = document.querySelectorAll('.days-list li');
            for (let i = 0; i < daysList.length; i++) {
                const dayData = data.list[i * 8];  // Approximate data every 8 hours, this gives roughly the same time next day
                daysList[i].querySelector('i').className = getWeatherIconClass(dayData.weather[0].main);
                daysList[i].querySelector('span').innerText = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
                daysList[i].querySelector('.day-temp').innerText = `${Math.round(dayData.main.temp)}°C`;
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data.");
        });
}

function getWeatherIconClass(weather) {
    switch (weather.toUpperCase()) {
        case 'CLEAR':
            return 'bx bx-sun';
        case 'CLOUDS':
            return 'bx bx-cloud';
        case 'RAIN':
            return 'bx bx-cloud-rain';
        case 'DRIZZLE':
            return 'bx bx-cloud-drizzle';
        default:
            return 'bx bx-cloud';
    }
}
