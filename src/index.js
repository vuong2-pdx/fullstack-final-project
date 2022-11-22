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
    name: 'The Walking Dead',
    id: 3130921,
    type: 'TV series',
    year: 2010,
    imdbId: 'tt1520211',
    plot: 'Sheriff Deputy Rick Grimes wakes up from a coma to learn the world is in ruins and must lead a group of survivors to stay alive.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZmU5NTcwNjktODIwMi00ZmZkLTk4ZWUtYzVjZWQ5ZTZjN2RlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    sources: [
      {
        sourceName: 'Pluto TV',
        sourceUrl: 'https://pluto.tv/on-demand/series/the-walking-dead-las-v2-1/season/1/episode/los-viejos-tiempos-2010-1-1-ptv4?utm_medium=deeplink&'
      },
      {
        sourceName: 'The Roku Channel',
        sourceUrl: 'https://therokuchannel.roku.com/details/262ea38208955c288df9d8d8f914028f/acheron-part-1?source=bing'
      },
      {
        sourceName: 'Amazon Prime',
        sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.c45832d5-79d4-412e-a6f7-e30a77e1975b'
      },
      {
        sourceName: 'Amazon',
        sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.da73f4e6-8c2a-4dda-a6f5-fde29e6f6d0c'
      },
      {
        sourceName: 'VUDU',
        sourceUrl: 'https://www.vudu.com/content/movies/details/The-Walking-Dead-Days-Gone-Bye/192198'
      },
      {
        sourceName: 'iTunes',
        sourceUrl: 'https://tv.apple.com/us/episode/days-gone-bye/umc.cmc.15rzagowjyf873yes8e2hakfb?playableId=tvs.sbd.9001%3A400607286&showId=umc.cmc.34jlsfedn38fy2oyokvrtezuq'
      },
      {
        sourceName: 'Google Play',
        sourceUrl: 'https://play.google.com/store/tv/show?amp=&cdid=tvseason-eVgGBa6zpHQ&gl=us&hl=en&id=voy4-XmMACg'
      },
      {
        sourceName: 'Microsoft Store',
        sourceUrl: 'https://www.microsoft.com/en-us/p/season-1/8d6kgwzlcjrg'
      },
      {
        sourceName: 'YouTube',
        sourceUrl: 'https://www.youtube.com/watch?v=YByvS6EqVp0'
      },
      {
        sourceName: 'fuboTV',
        sourceUrl: 'https://www.fubo.tv/lp/series/116043033/the-walking-dead/?irmp=1206980&irad=599307&season=0'
      },
      {
        sourceName: 'DirecTV On Demand',
        sourceUrl: 'https://www.directv.com/tv/Tales-of-the-Walking-Dead-OXdjZXF5TXcxcnVGby9GckxSaXJvUT09/Evie-Joe-UjJWMS9nemtYaWw3blNYL1VqMkhidz09'
      },
      {
        sourceName: 'Spectrum On Demand',
        sourceUrl: 'https://ondemand.spectrum.net/tv/amc/8282918/the-walking-dead/'
      },
      {
        sourceName: 'AMC+',
        sourceUrl: 'https://www.amcplus.com/shows/the-walking-dead/episodes/acheron-part-i--1027621'
      },
      {
        sourceName: 'Netflix',
        sourceUrl: 'https://www.netflix.com/watch/70210887'
      },
      {
        sourceName: 'AMC',
        sourceUrl: 'https://www.amc.com/shows/the-walking-dead/episodes/episode-01-days-gone-bye--1003778'
      }
    ]
  },
  {
    name: 'The Walking Dead: World Beyond',
    id: 3164993,
    type: 'TV series',
    year: 2020,
    imdbId: 'tt10148174',
    plot: 'The series will focus on the first generation to grow up during the zombie apocalypse.',
    poster: 'https://m.media-amazon.com/images/M/MV5BODEzZjAwOGMtMWZkZC00Nzg1LTlmNDUtNDU5NDA5YmViOTMwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
    sources: [
      {
        sourceName: 'Spectrum On Demand',
        sourceUrl: 'https://ondemand.spectrum.net/tv/amc-premiere/17889153/the-walking-dead-world-beyond/'
      },
      {
        sourceName: 'Amazon Prime',
        sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.32ba77ca-ebd7-835f-b6fa-b53647fe78ce'
      },
      {
        sourceName: 'The Roku Channel',
        sourceUrl: 'https://therokuchannel.roku.com/details/4b7566bbe96553008fc501acff755c9d/brave?source=bing'
      },
      {
        sourceName: 'Amazon',
        sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.32ba77ca-ebd7-835f-b6fa-b53647fe78ce'
      },
      {
        sourceName: 'Google Play',
        sourceUrl: 'https://play.google.com/store/tv/show?amp=&cdid=tvseason-8Mxvzda4iRQ.P&gl=us&hl=en&id=J5DbzZMyJzs.P'
      },
      {
        sourceName: 'VUDU',
        sourceUrl: 'https://www.vudu.com/content/movies/details/The-Walking-Dead-World-Beyond-Brave/1527769'
      },
      {
        sourceName: 'Microsoft Store',
        sourceUrl: 'https://www.microsoft.com/en-us/p/season-1/8d6kgwxn7b4l'
      },
      {
        sourceName: 'iTunes',
        sourceUrl: 'https://tv.apple.com/us/episode/brave/umc.cmc.d6rynpxwd7klotbni0ddl78i?playableId=tvs.sbd.9001%3A1534392187&showId=umc.cmc.357zbjbt11ad0aa8ecllu0lo5'
      },
      {
        sourceName: 'fuboTV',
        sourceUrl: 'https://www.fubo.tv/lp/series/116049664/the-walking-dead-world-beyond/?irmp=1206980&irad=599307&season=1'
      },
      {
        sourceName: 'Shudder',
        sourceUrl: 'https://www.shudder.com/play/10e8a01ec8f756ea'
      },
      {
        sourceName: 'Shudder (Via Amazon Prime)',
        sourceUrl: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.32ba77ca-ebd7-835f-b6fa-b53647fe78ce'
      },
      {
        sourceName: 'DirecTV On Demand',
        sourceUrl: 'https://www.directv.com/tv/The-Walking-Dead-World-Beyond-bUw4M053UTA5aTZGby9GckxSaXJvUT09/Brave-VjBtMzBRYzdIbHEwWXFta2cxZHhEdz09'
      },
      {
        sourceName: 'AMC+',
        sourceUrl: 'https://www.amcplus.com/shows/the-walking-dead-world-beyond/episodes/brave--1008664'
      },
      {
        sourceName: 'AMC',
        sourceUrl: 'https://www.amc.com/shows/the-walking-dead-world-beyond/episodes/brave--1008664'
      }
    ]
  },
  {
    name: 'The Walking Dead: The Journey So Far',
    id: 4149306,
    type: 'Movie',
    year: 2016,
    imdbId: 'tt6128602',
    plot: "From the moment Rick wakes up in the hospital, all the way to the last moments of season 6, the story of 'The Walking Dead' is told by those who have lived it.",
    poster: 'https://m.media-amazon.com/images/M/MV5BOGI0ZTM0NzctMWNiMy00MTg5LWI5NmItZDBmNWM4MTgzOTg2XkEyXkFqcGdeQXVyNDI3NzQxODA@._V1_SX300.jpg',
    sources: []
  },
  {
    name: 'The Walking Dead',
    id: 1426504,
    type: 'Movie',
    year: 1936,
    imdbId: 'tt0028478',
    plot: 'After hapless pianist and ex-con John Elman is framed for murder, he is resurrected by a scientist after his execution.',
    poster: 'https://m.media-amazon.com/images/M/MV5BZmFkNmNjNDYtYTc5ZS00YmFlLWIwZGYtMWU2MmYyZGU2NmJjXkEyXkFqcGdeQXVyMzg1ODEwNQ@@._V1_SX300.jpg',
    sources: []
  },
  {
    name: 'The Walking Dead: Origins',
    id: 3176495,
    type: 'TV series',
    year: 2021,
    imdbId: 'tt15130518',
    plot: 'Revisiting the stories of major characters, presented and narrated by the cast members who play them; taking a look back at key moments and events that affected them the most on their journeys through The Walking Dead Universe.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNWIyNThjYWQtM2Y5Yi00ZjNhLTgwZmQtMDUwZTkxMDY5MDI0XkEyXkFqcGdeQXVyOTI3NzkwNzQ@._V1_SX300.jpg',
    sources: [
      {
        sourceName: 'fuboTV',
        sourceUrl: 'https://www.fubo.tv/lp/series/123910606/the-walking-dead-origins/?irmp=1206980&irad=599307&season=1'
      },
      {
        sourceName: 'DirecTV On Demand',
        sourceUrl: 'https://www.directv.com/tv/The-Walking-Dead-Origins-R3NQTjJLbUJncFNGby9GckxSaXJvUT09/Daryl-s-Story-Q3FXQkltY25hNjdSenFDZDVlQ3gzdz09'
      },
      {
        sourceName: 'Spectrum On Demand',
        sourceUrl: 'https://ondemand.spectrum.net/tv/amc-premiere/20157959/the-walking-dead-origins/'
      },
      {
        sourceName: 'AMC+',
        sourceUrl: 'https://www.amcplus.com/shows/the-walking-dead-origins/episodes/daryl-s-story--1032701'
      }
    ]
  },
  {
    name: 'The Walking Dead',
    id: 1426503,
    type: 'Movie',
    year: 1995,
    imdbId: 'tt0114888',
    plot: '1972 Vietnam, a small group of United States Marines relive flashbacks of their contrite lives prior to serving in the military while being left to survive behind enemy lines.',
    poster: 'https://m.media-amazon.com/images/M/MV5BNGZiMzlhMDItMmUxOC00NzA1LTkyMzItMzRhMmZjOWM0ZjBhXkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SX300.jpg',
    sources: []
  },
  {
    name: 'The Walking Dead: Dead City',
    id: 544157,
    type: 'TV series',
    year: 2023,
    imdbId: 'tt18546730',
    plot: 'N/A',
    poster: 'https://m.media-amazon.com/images/M/MV5BNDBkNzc0ZTMtZTVhZC00YzMzLWI3ZmUtODVjZmQ2ZWZlOTI3XkEyXkFqcGdeQXVyMzYzOTI0OTU@._V1_SX300.jpg',
    sources: []
  },
  {
    name: 'The Walking Dead Girls',
    id: 1541650,
    type: 'Movie',
    year: 2011,
    imdbId: 'tt1969166',
    plot: 'The Walking Dead Girls is a behind-the-scenes look into zombie culture in the United States and the obsession into ""Sexy Female Zombies"". What is it about Zombie Bimbos or ""Zimbies"" that are starting to gain the worlds interes...',
    poster: 'https://m.media-amazon.com/images/M/MV5BMTgzOTY2ODUzNV5BMl5BanBnXkFtZTcwMjQ4NDE5Ng@@._V1_SX300.jpg',
    sources: [
      {
        sourceName: 'Google Play',
        sourceUrl: 'https://play.google.com/store/movies/details?id=IS3rbLI2TXY'
      },
      {
        sourceName: 'YouTube',
        sourceUrl: 'https://www.youtube.com/results?search_query=The+Walking+Dead+Girls%2Bmovie'
      },
      {
        sourceName: 'FlixFling',
        sourceUrl: 'https://www.flixfling.com/movie/3132'
      },
      {
        sourceName: 'Kanopy',
        sourceUrl: 'https://www.kanopy.com/product/walking-dead-girls'
      }
    ]
  }
]

app.post("/submit", async (req, res) => {
  const title = req.body.title
  
  res.render("searchResults", {
    title: "Search Results",
    heading: "Search results",
    subheading: `Found the following for '${title}'`,
    results: sampleResults
    // results: await search.renderResults(title)
  });
});

app.use("/WatchList", watchList);

app.listen(port, () => {
  console.log(`${__dirname}`);
  console.log(`listening on port http://localhost:${port}`);
});
