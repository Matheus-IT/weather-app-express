const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
	const apiKey = 'b8918abe720101b4392cb8b50fc524de';
	const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;

	https.get(url, (response) => {
		console.log(response.statusCode);
	});
});

const port = 3000;
app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});
