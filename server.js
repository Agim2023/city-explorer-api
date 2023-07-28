


const express = require('express');
// create our webserver app
const app = express();
// load our .env file
// don't forget to npm install dotenv
require('dotenv').config()

const data = require("./data/weather.json");
// define the port
const port = process.env.PORT || 3002;


app.get("/", (request, response) => {
    response.send("Hello World");
});

app.get("/weather", (request, response) => {
    const extractedData = weatherData.map((data) => {
        return {
            cityName: data.cityName,
            lon: data.lon,
            lat: data.lat,
        };
    });

    response.send(extractedData);
});

app.get("/weather", (request, response) => {
    const { lat, lon, searchQuery } = request.query;
    const cityData = weatherData.find((data) => {
        return (
            data.lat === lat || data.lon === lon || data.cityName === searchQuery
        );
    });

    if (cityData) {
        const { cityName, lon, lat } = cityData;
        response.send({ cityName, lon, lat });
    } else {
        response.status(404).send("City not found.");
    }
});

app.listen(3000, () => {
    console.log("listen on the port 3000...");
});