// Viktoriya Petrova @ViktoriyaPetrova
// Router for /WatchList end point

const express = require("express");
const app = express();
const router = express.Router();

const movieController = require("./movieController");

router.get("/", (req, res) => {
  const promise = movieController.retrieveAllMovies();
  promise.then(
    (response) => {
      res.render("watchList", {
        heading: "Watch List",
        results: response,
      });
    },
    (error) => {
      console.log(error);
    }
  );
});

//Dynamic routing
router.get("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);
  // console.log(req.params.id);
  // console.log(parsedId);

  if (!isNaN(parsedId)) {
    const promise = movieController.findMovie(parsedId);
    promise.then(
      (response) => {
        res.render("movieDisplay", {
          title: response.title,
          poster: response.poster,
          rating: response.rating,
          review: response.review,
          watched: response.watched,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  } else {
    console.log("NAN");
    res.end();
  }
});

//Update star rating for each movie
router.post("/:id/rating", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);
  movieController.updateRating(parsedId, req.body.star);
  res.end();
});

//Update watched preference
router.post("/:id/watched", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);
  movieController.updateWatched(parsedId, req.body.watched);
  res.end();
});

//Update user review
router.post("/:id/review", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);
  movieController.updateReview(parsedId, req.body.review);
  res.end();
});

// Add title to the watch list
router.post("/addToDb", (req, res) => {
  let title = req.body

  let tempSources = []

  let tempSourceName = []
  let tempSourceUrl = []

  for (const [key, value] of Object.entries(title)) {
    if (key.includes('sourceName')) {
      tempSourceName.push(value)
    }
    if (key.includes('sourceUrl')) {
      tempSourceUrl.push(value)
    }
  }

  tempSourceName.map((currSourceName, index) => tempSources.push({
    sourceName: currSourceName,
    sourceUrl: tempSourceUrl[index]
  }))

  let titleSchemaObj = {
    movieID: parseInt(req.body.id),
    imdbID: req.body.imdbId,
    title: req.body.name,
    type: req.body.type,
    year: parseInt(req.body.year),
    poster: req.body.poster,
    rating: 0,
    plot: req.body.plot,
    review: '',
    watched: false,
    sources: tempSources.map(x => x)
  }

  movieController.addMovie(titleSchemaObj)
  // movieController.removeMovie(titleSchemaObj.movieID)
  .then((data) => {
    res.status(200).send(data)
    res.end()
  })
  .catch((error) => {
    console.log(error)
    res.status(error.status || 500).send({error: error.message})
  })
});

module.exports = router;
