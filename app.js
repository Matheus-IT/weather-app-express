const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
	const apiKey = 'b8918abe720101b4392cb8b50fc524de';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}`;

	https.get(url, (response) => {
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            console.log(weatherData);
            console.log(temp);
            console.log(weatherDescription);
        });
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
