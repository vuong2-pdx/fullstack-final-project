// import {searchTest} from './search.js'
const express = require('express');
const search = require('./search');
const app = express();
const port = process.env.PORT || 5001;
const { randomize } = require('./randomize');

app.set('views', __dirname + '/../' + 'views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + '/../' + '/public'));

//Connect to DB
//If you want to save the URI into .env file uncomment the following:
// const dotenv = require("dotenv").config();

const connectDB = require('./db');
connectDB();

//Route variables
const watchList = require('./routes/watchList');
const { format } = require('path');
const { URLSearchParams } = require('url');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main',
    heading: 'Welcome to this page built with Pug templates!',
  });
});

let data = { type: 'either', item: {} };
app.get('/random', async (req, res) => {
  console.log(data.type);
  res.render('random', {
    type: data.type,
    title: 'Randomize',
    heading: 'Randomize page',
    subheading: data.item.title,
    poster: data.item.poster,
    year: data.item.year,
    plot: data.item.plot_overview,
  });
  res.end();
});

app.post('/random/:type', async (req, res) => {
  const type = req.body.type;
  console.log('app.post: ' + type);
  data.type = type;
  data.item = await randomize(type);

  res.end();
});

app.get('/about', (req, res) => {
  res.render('page', {
    title: 'About',
    heading: 'About Page',
    subheading: 'Sub-Heading #1',
  });
});

app.get('/search', async (req, res) => {
  res.render('search', {
    title: 'Search',
    heading: 'Search for a movie or TV show',
    subheading: 'Enter in your search query',
    results: await search.renderResults(),
  });
});

app.use('/WatchList', watchList);

app.listen(port, () => {
  console.log(`${__dirname}`);
  console.log(`listening on port http://localhost:${port}`);
});
