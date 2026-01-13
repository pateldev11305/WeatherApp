const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="244c1738e5c81d3229614f6dbd693106";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city=cityInput.value.trim().toLowerCase();
    if(city){
        try{
            const weatherData=await getWeatherData(city);
            displayWeatherInfo(weatherData); 
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a valid city name.");
    }
});
async function getWeatherData(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response=await fetch(apiUrl);
    if(!response.ok){
        throw new Error("City not found. Please check the city name and try again.");
    }
    return await response.json();
} 
function displayWeatherInfo(data){
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id }]
    } = data;
    setCardBackground(id);

    card.innerHTML = "";
    card.style.display = "flex";

    
    const weatherEmoji = document.createElement("p");
    weatherEmoji.classList.add("weatherEmoji");
    weatherEmoji.textContent = getWeatherEmoji(id);

    
    const weatherData = document.createElement("div");
    weatherData.classList.add("weatherData");

    const cityDisp = document.createElement("h1");
    const tempDisp = document.createElement("p");
    const humidityDisp = document.createElement("p");
    const descDisp = document.createElement("p");

    cityDisp.classList.add("cityDisp");
    tempDisp.classList.add("tempDisp");
    humidityDisp.classList.add("humidityDisp");
    descDisp.classList.add("descDisp");

    cityDisp.textContent = city;
    tempDisp.textContent = `Temperature: ${(temp - 273.15).toFixed(2)}°C`;
    humidityDisp.textContent = `Humidity: ${humidity}%`;
    descDisp.textContent = `Condition: ${description}`;

    weatherData.append(cityDisp, tempDisp, humidityDisp, descDisp);
    card.append(weatherEmoji, weatherData);
}
function setCardBackground(weatherId){
    let bg;

    if (weatherId >= 200 && weatherId < 300){
        bg = "linear-gradient(180deg, #283644ff, #4ca1af)"; // thunder
    }
    else if (weatherId >= 300 && weatherId < 400){
        bg = "linear-gradient(180deg, #4b79a1, #a1c4fd)"; // drizzle
    }
    else if (weatherId >= 500 && weatherId < 600){
        bg = "linear-gradient(180deg, #0f2027, #2c5364)"; // rain
    }
    else if (weatherId >= 600 && weatherId < 700){
        bg = "linear-gradient(180deg, #e6f0ff, #ffffff)"; // snow
    }
    else if (weatherId >= 700 && weatherId < 800){
        bg = "linear-gradient(180deg, #bdc3c7, #ecf0f1)"; // fog
    }
    else if (weatherId === 800){
        bg = "linear-gradient(180deg, #85efe8ff, #e2b15eff)"; // clear
    }
    else{
        bg = "linear-gradient(180deg, #28eff6ff, #d6dde9ff)"; // clouds
    }

    card.style.background = bg;
}


function getWeatherEmoji(weatherId){
    switch (true){
        case weatherId>=200 && weatherId<300:
            return "⛈️";
        case weatherId>=300 && weatherId<400:
            return "🌦️";
        case weatherId>=500 && weatherId<600:
            return "🌧️";
        case weatherId>=600 && weatherId<700:
            return "❄️";
        case weatherId>=700 && weatherId<800:
            return "😶‍🌫️";
        case weatherId===800:
            return "☀️";
        case weatherId>=801 && weatherId<810:
            return "☁️";
        default:
            return "🌈";
    }

}
function displayError(message){
    const errorDisp=document.createElement("p");
    errorDisp.textContent=message;
    errorDisp.classList.add("errorDisp");

    card.textContent=" ";
    card.style.display="flex";
    card.appendChild(errorDisp);
}