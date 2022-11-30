// import {searchTest} from './search.js'
const express = require('express');
const search = require('./search');
const app = express();
const port = process.env.PORT || 5001;
<<<<<<< HEAD
=======
const { randomize } = require('./randomize');
const movieController = require('./movieController');
>>>>>>> d284406 (randmoze page 80%)

app.set('views', __dirname + '/../' + 'views');
app.set('view engine', 'pug');
<<<<<<< HEAD

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an object
app.use(express.urlencoded({ extended: false }));
=======
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
>>>>>>> f86784e (randomize from movie or tv or all)

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + '/../' + '/public'));
app.use(express.urlencoded({ extended: false }));

//Connect to DB
const connectDB = require('./db');
connectDB();

//Route variables
<<<<<<< HEAD
const watchList = require('./watchList');
const randRoute = require('./randRoute');
=======
const watchList = require('./routes/watchList');
const { format } = require('path');
const { URLSearchParams } = require('url');
>>>>>>> f86784e (randomize from movie or tv or all)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main',
    heading: 'Welcome to this page built with Pug templates!',
  });
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
let data = { type: 'either', item: {} };
=======
let data = { type: '', item: {} };
>>>>>>> d284406 (randmoze page 80%)
app.get('/random', async (req, res) => {
  const tmdbType = data.item.tmdb_type === 'movie' ? 'Movie' : 'TV Show';
  res.render('random', {
    type: data.type,
    title: 'Randomize',
    subheading: data.item.title,
    poster: data.item.poster,
    rating: data.item.user_rating,
    tmdbType: tmdbType,
    year: data.item.year,
    plot: data.item.plot_overview,
    imdbId: data.item.imdb_id,
  });
  res.end();
});

app.post('/random/:type', async (req, res) => {
  const type = req.body.type;
  data.type = type;
  let list = [];
  if (data.type === 'watchList') {
    console.log('entered watche list');
    list = await movieController.retrieveAllMovies();
    data.item = await randomize(list);
    console.log(list);
    console.log(data.item);
  } else {
    data.item = await randomize(type);
  }
  // console.log(data.item);

  res.end();
});

<<<<<<< HEAD
>>>>>>> f86784e (randomize from movie or tv or all)
=======
app.get('/random/randd', (req, res) => {
  res.render('randDisplay');
});

>>>>>>> d284406 (randmoze page 80%)
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    heading: 'About',
    subheading: 'Sub-Heading #1',
  });
});

app.get('/search', async (req, res) => {
  res.render('search', {
    title: 'Search',
    heading: 'Search for a movie or TV show',
    subheading: 'Enter in your search query',
  });
});

app.post('/submit', async (req, res) => {
  const title = req.body.title;

  res.render('searchResults', {
    title: 'Search Results',
    heading: 'Search results',
    subheading: `Found the following for '${title}'`,
    results: await search.renderResults(title),
  });
});

app.use('/WatchList', watchList);

//Error page
app.get('/error', (req, res) => {
  res.render('error', {
    err: 'Something went wrong',
  });
});

app.use('/random', randRoute);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
