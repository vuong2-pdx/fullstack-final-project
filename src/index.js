// import {searchTest} from './search.js'
const express = require('express');
const search = require('./search');
const app = express();
const port = process.env.PORT || 5001;

app.set('views', __dirname + '/../' + 'views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + '/../' + '/public'));
app.use(express.urlencoded({ extended: false }));

//Connect to DB
const connectDB = require('./db');
connectDB();

//Route variables
const watchList = require('./watchList');
const randRoute = require('./randRoute');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main',
    heading: 'Welcome to this page built with Pug templates!',
  });
});

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
