// import {searchTest} from './search.js'
const express = require("express");
const search = require("./search");
const app = express();
const port = process.env.PORT || 5001;
const { randomize } = require('./randomize');

app.set("views", __dirname + "/../" + "views");
app.set("view engine", "pug");
app.use(express.static(__dirname + "/public"));

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + "/../" + "/public"));

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

/*
[
  {
    name: 'Abbott Elementary',
    id: 3179719,
    type: 'TV series',
    sources: [
              {
                sourceName: 'ABC',
                sourceUrl: 'https://abc.com/shows/abbott-elementary/episode-guide/season-02/04-the-principals-office'
              },
              {
                sourceName: 'VUDU',
                sourceUrl: 'https://www.vudu.com/content/movies/details/Abbott-Elementary-Pilot/1967332'
              },
              {
                sourceName: 'VUDU',
                sourceUrl: 'https://www.vudu.com/content/movies/details/Abbott-Elementary-Pilot/1967332'
              },
              {
                sourceName: 'Amazon',
                sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.7b2c410f-aace-4e7d-af1d-86d3adb05e57'
              },
              {
                sourceName: 'Amazon',
                sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.7b2c410f-aace-4e7d-af1d-86d3adb05e57'
              },
              {
                sourceName: 'iTunes',
                sourceUrl: 'https://tv.apple.com/us/episode/pilot/umc.cmc.4le8nn3f9u8gfdanaeluf74ui?playableId=tvs.sbd.9001%3A1599127206&showId=umc.cmc.4yajt40knug1iwx1l9hrjxkxy'
              }
    ]
  }
]
*/

app.get("/search", async (req, res) => {
  res.render("search", {
    title: "Search",
    heading: "Search for a movie or TV show",
    subheading: "Enter in your search query",
    // results: []
    results: await search.renderResults()
  });
});

app.use("/WatchList", watchList);

app.listen(port, () => {
  console.log(`${__dirname}`);
  console.log(`listening on port http://localhost:${port}`);
});
