const apiKey = "f25bab9a93ee0fdeef42e879c13d7d45";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bydgoszcz";

async function checkWeather() {
	const response = await fetch(apiUrl + `&appid=${apiKey}`);
	const data = await response.json();

	console.log(data);

	document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
	document.querySelector(".city").innerHTML = data.name;
	document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
	document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
}

checkWeather();
