const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


app.post('/', (req, res) => {
	function capitalize(string) {
		const firstLetter = string[0].toUpperCase();
		return firstLetter + string.slice(1);
	}

	const { cityName } = req.body;
	const apiKey = 'b8918abe720101b4392cb8b50fc524de';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
	
	https.get(url, (response) => {
	    response.on('data', (data) => {
	        const weatherData = JSON.parse(data);
	        const temperature = weatherData.main.temp;
	        const weatherDescription = weatherData.weather[0].description;
	        const iconName = weatherData.weather[0].icon;
	        const iconURL = `http://openweathermap.org/img/wn/${iconName}@2x.png`;
	
	        res.write(`<p>The weather is currently${weatherDescription}</p>`);
	        res.write(`<h1>The temperature in ${capitalize(cityName)} is ${temperature}</h1>`);
	        res.write(`<img src="${iconURL}" alt="">`);
	        res.send();
	    });
	});
});


const port = 3000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
