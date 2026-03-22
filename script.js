const OWM_API_KEY = 'b8e71ff17596f6aba420ad0db36903b5';

function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    document.getElementById('clock').textContent = timeStr;
}

updateClock();
setInterval(updateClock, 1000);

function renderWeather(data) {
    const container = document.getElementById('weather');
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    container.innerHTML =
        '<div class="weather-content">' +
        '<img class="weather-icon" src="https://openweathermap.org/img/wn/' + icon + '@2x.png" alt="' + desc + '">' +
        '<div class="weather-info">' +
        '<span class="weather-temp">' + temp + '°C</span>' +
        '<span class="weather-desc">' + desc + '</span>' +
        '</div>' +
        '</div>';
}

function renderWeatherError() {
    const container = document.getElementById('weather');
    container.innerHTML = '<span class="weather-unavailable">данные недоступны</span>';
}

function fetchWeather() {
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Penza,RU&appid=' +
        OWM_API_KEY +
        '&units=metric&lang=ru'
    )
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then(renderWeather)
        .catch(renderWeatherError);
}

fetchWeather();
setInterval(fetchWeather, 10 * 60 * 1000);
