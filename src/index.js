// import {searchTest} from './search.js'
const express = require("express");
const search = require("./search");
const app = express();
const port = process.env.PORT || 5001;
const { randomize } = require('./randomize');

app.set("views", __dirname + "/../" + "views");
app.set("view engine", "pug");

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + "/../" + "/public"));
app.use(express.urlencoded( { extended : false }))

//Connect to DB
//If you want to save the URI into .env file uncomment the following:
// const dotenv = require("dotenv").config();

const connectDB = require("./db");
connectDB();

//Route variables
const watchList = require("./routes/watchList");

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Main',
    heading: 'Welcome to this page built with Pug templates!',
  });
});

app.get('/random', async (req, res) => {
  const data = await randomize();
  console.log(data);
  res.render('random', {
    title: 'Randomize',
    heading: 'Randomize page',
    subheading: data.Title,
    poster: data.Poster,
    year: data.Year,
    plot: data.Plot,
  });
});

app.get('/about', (req, res) => {
  res.render('page', {
    title: 'About',
    heading: 'About Page',
    subheading: 'Sub-Heading #1',
  });
});

app.get("/search", async (req, res) => {
  res.render("search", {
    title: "Search",
    heading: "Search for a movie or TV show",
    subheading: "Enter in your search query",
  });
});

const sampleResults = [
  {
    name: 'Stranger Things',
    id: 3112487,
    type: 'TV series',
    year: 2021,
    imdbId: 'tt14218830',
    plot: 'Follows a group of teachers brought together in one of the worst public schools in the country, simply because they love teaching.',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTY1MWUwYjItY2JmYi00ZDgyLTgzMjUtNzNkMzg0NjNjYTdkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
    sources: [
        {
          sourceName: 'Netflix Free',
          sourceUrl: 'http://www.netflix.com/title/80057281'
        },
        {
          sourceName: 'Netflix',
          sourceUrl: 'https://www.netflix.com/watch/80077368'
        }
    ]
  },
  { name: 'Stranger Things', id: 1523556, type: 'Movie', sources: [] }
]

app.post("/submit", async (req, res) => {
  const title = req.body.title
  
  res.render("searchResults", {
    title: "Search Results",
    heading: "Search results",
    subheading: `Found the following for ${title}`,
    results: sampleResults
    // results: await search.renderResults(title)
  });
});

app.use("/WatchList", watchList);

app.listen(port, () => {
  console.log(`${__dirname}`);
  console.log(`listening on port http://localhost:${port}`);
});
