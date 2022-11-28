// import {searchTest} from './search.js'
const express = require("express");
const search = require("./search");
const app = express();
const port = process.env.PORT || 5001;
const { randomize } = require("./randomize");

app.set("views", __dirname + "/../" + "views");
app.set("view engine", "pug");

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an object
app.use(express.urlencoded({ extended: false }));

//Midlleware function to serve static files such as images or css
app.use(express.static(__dirname + "/../" + "/public"));
app.use(express.urlencoded({ extended: false }));

//Connect to DB

const connectDB = require("./db");
connectDB();

//Route variables
const watchList = require("./watchList");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Main",
    heading: "Welcome to this page built with Pug templates!",
  });
});

app.get("/random", async (req, res) => {
  const data = await randomize();
  console.log(data);
  res.render("random", {
    title: "Randomize",
    heading: "Randomize page",
    subheading: data.Title,
    poster: data.Poster,
    year: data.Year,
    plot: data.Plot,
  });
});

app.get("/about", (req, res) => {
  res.render("page", {
    title: "About",
    heading: "About Page",
    subheading: "Sub-Heading #1",
  });
});

app.get("/search", async (req, res) => {
  res.render("search", {
    title: "Search",
    heading: "Search for a movie or TV show",
    subheading: "Enter in your search query",
  });
});

app.post("/submit", async (req, res) => {
  const title = req.body.title;

  res.render("searchResults", {
    title: "Search Results",
    heading: "Search results",
    subheading: `Found the following for '${title}'`,
    results: await search.renderResults(title),
  });
});

app.use("/WatchList", watchList);

//SAMPLE ERROR PAGE. Delete?
app.get("/error", (req, res) => {
  res.render("error", {
    err: "Something went wrong",
  });
});

//DELETE DELETE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const movieController = require("./movieController");
app.get("/temp", (req, res) => {
  let dummyMovie = {
    // movieID: 375254,
    movieID: 375255,
    imdbID: 111111,
    title: "Manifest",
    type: "TV Show",
    year: 2019,
    poster: "https:\\cdn.watchmode.composters\0375254_poster_w185.jpg",
    rating: 0,
    plot: "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    review: "",
    watched: false,
    sources: [
      { sourceName: "Netflix", sourceUrl: "https://www.netflix.com/" },
      { sourceName: "Hulu", sourceUrl: "https://www.hulu.com/" },
      {
        sourceName: "Amazon Prime",
        sourceUrl: "https://www.amazon.com/Prime-Video/b?node=2676882011",
      },
      { sourceName: "Peacock", sourceUrl: "https://www.peacocktv.com/" },
      { sourceName: "Disney+", sourceUrl: "https://www.disneyplus.com" },
    ],
  };
  movieController.addMovie(dummyMovie);
  res.end();
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
