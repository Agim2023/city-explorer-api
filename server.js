
const express = require('express');

const data = require('./data/weather.json');

const cors = require('cors');

console.log(data);

const app = express();
const PORT = 3001;

app.use(cors({
  origin: '*'
}));

app.get('/', (request, response) => {
  response.send('Hello everybody');
});



class Forecast {
  constructor(ForecastObj) {
    this.valid_date = ForecastObj.valid_date;
    this.description = ForecastObj.weather.description;
  }
}


app.get('/weather', async (request, response, next) => {
  let city = request.query.searchQuery;
  console.log(city);
  let town = data.find((p) => p.city_name === city);
  if (!town) {
    return next(new Error('Can\'t Find City'));
  }
  const extractedData = town.data.map((data) => {
    return new Forecast(data);
  });

  response.send(extractedData);
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});


// app.get("/weather", (request, response) => {
//   const { lat, lon, searchQuery } = request.query;
//   const cityData = weatherData.find((data) => {
//     return (
//       data.lat === lat || data.lon === lon || data.city_name === searchQuery
//     );
//   });

// if (cityData) {
//   const { city_name, lon, lat } = cityData;
//   response.send({ city_name, lon, lat });
// } else {
//   response.status(404).send('City not found.');
// });
// );

app.listen(PORT, () => {
  console.log(PORT);
});
// const express = require("express");
// const cors = require("cors");
// const app = express();

// const data = require("./data/weather.json");

// class Forecast {
//     constructor(ForecastObj) {
//         this.data.valid_date = ForecastObj.data.valid_date;
//         this.data.data.weather.description = ForecastObj.weather.description;
//         this.data.city_name = ForecastObj.data.city_name;
//     }
// }

// app.get("/", (request, response) => {
//     response.send("Hello World");
// });

// app.get("/weather", (request, response) => {
//     const extractedData = data.map((data) => {
//         return {
//             city_name: data.city_name,
//             valid_date: data.data[0].valid_date,
//             description: data.data[0].weather.description,
//         };
//     });

//     response.send(extractedData);
// });

// app.get("/weather/:city", (request, response) => {
//     const { city } = request.params;
//     const cityData = data.find((data) => data.city_name === city);

//     if (cityData) {
//         const { city_name, valid_date, description } = cityData;
//         response.send({ city_name, valid_date, description });
//     } else {
//         response.status(404).send("City not found.");
//     }
// });

// app.get("/weather/:city", (request, response) => {
//     const { city } = request.params;
//     const cityData = data.find((data) => data.city_name === city);

//     if (cityData) {
//         const forecast = cityData.data.map((data) => new Forecast(data));
//         response.send(forecast);
//     } else {
//         response.status(404).send("City not found.");
//     }
// });

// app.listen(3000, () => {
//     console.log("Listen on the port 3000...");
// });