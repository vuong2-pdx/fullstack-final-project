// import {searchTest} from './search.js'
const express = require('express');
const search = require('./search');
const app = express();
const port = process.env.PORT || 5001;
const { randomize, getStreamingSources } = require('./randomize');
const movieController = require('./movieController');

app.set('views', __dirname + '/../' + 'views');
app.set('view engine', 'pug');

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an object
app.use(express.urlencoded({ extended: false }));

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + '/../' + '/public'));
app.use(express.urlencoded({ extended: false }));

//Connect to DB
const connectDB = require('./db');
connectDB();

//Route variables
const watchList = require('./watchList');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main',
    heading: 'Welcome to this page built with Pug templates!',
  });
});

let data = { type: '', item: {} };
app.get('/random', async (req, res) => {
  const tmdbType = data.item.tmdb_type === 'movie' ? 'Movie' : 'TV Show';
  res.render('random', {
    init: 'CLICK ONE TO START',
    type: data.type,
    title: 'Choose for Me',
    subheading: data.item.title,
    poster: data.item.poster,
    rating: data.item.user_rating || 'null',
    tmdbType: tmdbType,
    year: data.item.year,
    plot: data.item.plot_overview,
    id: data.item.id,
  });
  res.end();
});

app.post('/random/:type', async (req, res) => {
  const type = req.body.type;
  data.type = type;
  if (data.type === 'watchList') {
    console.log('entered watche list');
    let list = await movieController.retrieveAllMovies();
    data.item = await randomize(list);
  } else {
    data.item = await randomize(type);
  }

  res.end();
});

app.get('/random/:id', async (req, res) => {
  const id = req.url.split('/').pop();
  const param = data.item.trailer.toString().split('=').pop();
  const trailer = new URL(param, 'https://www.youtube.com/embed/');
  let sources = await getStreamingSources(id);
  res.render('randDisplay', {
    data: data.item,
    trailer: trailer,
    source: sources,
  });
  res.end();
});

app.post('/random/:id/add', async (req, res) => {
  movieController
    .addMovie(req.body)
    .then(() => {
      console.log('Add success');
    })
    .catch((err) => {
      console.log('Add failed');
      console.log(err);
    });

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

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
