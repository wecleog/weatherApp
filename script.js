const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {

    const APIKey = '472b5d6d7c43ce14be836434fd985594';
    const city = document.querySelector('.search-box input').value.toUpperCase();

    if (city == '') {
        return
    };

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }    

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const desc = document.querySelector('.weather-box .desc');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
            case 'Clear': 
                image.src = 'src/sunny.png'
                break;
            case 'Rain': 
                image.src = 'src/rain.png'
                break;
            case 'Snow': 
                image.src = 'src/snow.png'
                break;
            case 'Clouds': 
                image.src = 'src/cloud.png'
                break;
            case 'Mist': 
                image.src = 'src/fog.png'
                break;
            case 'Haze': 
                image.src = 'src/fog.png'
                break;
            case 'Thunderstorm': 
                image.src = 'src/thunder.png'
                break;
            
            default:
                image.src = '/src/cloud.png'
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${Math.round(json.wind.speed)}Km/h`;
    
    });
});
