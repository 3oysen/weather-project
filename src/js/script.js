const weatherApiKey = "f25bab9a93ee0fdeef42e879c13d7d45";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const citiesApiUrl = "https://countriesnow.space/api/v0.1/countries";

const searchInput = document.querySelector(".input-container input");
const searchBtn = document.querySelector(".search-button button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkCities(text) {
	const response = await fetch(citiesApiUrl);
	const citiesData = await response.json();
	const allCities = citiesData.data.flatMap((x) => x.cities);
	const allCitiesToLowerCase = allCities.map((x) => x.toLowerCase());
	const mapChecked = allCitiesToLowerCase.filter((x) => x.includes(text));

	document.getElementById("suggestionOne").innerHTML = mapChecked[0];
	document.getElementById("suggestionTwo").innerHTML = mapChecked[1];
	document.getElementById("suggestionTree").innerHTML = mapChecked[2];
	document.getElementById("suggestionFour").innerHTML = mapChecked[3];
	document.getElementById("suggestionFive").innerHTML = mapChecked[4];

	console.log(mapChecked);
}

function handleInputChange() {
	const inputData = searchInput.value;
	const text = inputData.toLowerCase();
	checkCities(text);
	// console.log(text);
}

searchInput.addEventListener("input", handleInputChange);

async function checkWeather(city) {
	const response = await fetch(weatherApiUrl + city + `&appid=${weatherApiKey}`);
	const data = await response.json();

	document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
	document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

	if (data.weather[0].main == "Clear") {
		weatherIcon.src = "/images/icon-weather/clear.png";
	} else if (data.weather[0].main == "Clouds") {
		weatherIcon.src = "/images/icon-weather/clouds.png";
	} else if (data.weather[0].main == "Drizzle") {
		weatherIcon.src = "/images/icon-weather/drizzle.png";
	} else if (data.weather[0].main == "Mist") {
		weatherIcon.src = "/images/icon-weather/mist.png";
	} else if (data.weather[0].main == "Rain") {
		weatherIcon.src = "/images/icon-weather/rain.png";
	} else if (data.weather[0].main == "Snow") {
		weatherIcon.src = "/images/icon-weather/snow.png";
	} else if (data.weather[0].main == "Thunderstorm") {
		weatherIcon.src = "/images/icon-weather/thunderstorm.png";
	}

	document.querySelector(".sun-loader").style.display = "none";
	document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
	checkWeather(searchInput.value);
});

// checkCities();
