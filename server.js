
const express = require('express');

// const data = require('./data/weather.json');

const cors = require('cors');
const { default: axios } = require('axios');

require("dotenv").config();


const app = express();
const PORT = 3001;

const weatherKey = process.env.WEATHER_API_KEY
const movieKey = process.env.MOVIES_API_KEY

app.use(cors({
  origin: '*'
}));

app.get('/', (request, response) => {
  response.send('Hello everybody');
});



class Forecast {
  constructor(valid_date, description) {
    this.valid_date = valid_date;
    this.description = description;
  }
}


app.get('/weather', async (request, response, next) => {
  try {
    let { lat, lon } = request.query;
    const weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lat=${lat}&lon=${lon}`);
    const extractedData = weatherData.data.data.map((item) => {
      return new Forecast(item.valid_date, item.weather.description);
    });

    response.status(200).send(extractedData);
  } catch (error) {
    next(error);
  }


});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Movie {
  constructor(title, released_on, overview) {
    this.title = title;
    this.released_on = released_on;
    this.overview = overview;
  }
}

app.get('/movie', async (request, response) => {
  const { location } = request.query;

  try {
    const movieKey = process.env.MOVIES_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api=key${movieKey}&query=${location}`;
    const response = await axios.get(url);

    const Movie = response.data.results.map((Movie) => {
      return new Movie(Movie.title, Movie.released_on, Movie.overview);
    });

    response.json(Movie);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'An error occurred while fetching movie data' });
  }
});



app.listen(PORT, () => {
  console.log(PORT);
});
