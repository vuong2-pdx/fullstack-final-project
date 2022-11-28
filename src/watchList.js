// Viktoriya Petrova @ViktoriyaPetrova
// Router for /WatchList end point

const express = require("express");
const app = express();
const router = express.Router();

const movieController = require("./movieController");

router.get("/", (req, res) => {
  try {
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
        res.render("error", { err: error });
      }
    );
  } catch (error) {
    res.render("error", { err: error });
  }
});

//Dynamic routing
router.get("/:id", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  try {
    const promise = movieController.findMovie(parsedId);
    promise.then(
      (response) => {
        res.render("movieDisplay", {
          title: response.title,
          poster: response.poster,
          rating: response.rating,
          review: response.review,
          watched: response.watched,
          plot: response.plot,
          type: response.type,
          year: response.year,
          sources: response.sources,
        });
      },
      (error) => {
        console.log(error);
        res.render("error", { err: error });
      }
    );
  } catch (error) {
    res.render("error", { err: error });
  }
});

//Update star rating for each movie
router.post("/:id/rating", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);
  try {
    movieController.updateRating(parsedId, req.body.star);
  } catch (error) {
    res.render("error", { err: error });
  }
  res.end();
});

//Update watched preference
router.post("/:id/watched", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  try {
    movieController.updateWatched(parsedId, req.body.watched);
  } catch (error) {
    res.render("error", { err: error });
  }
  res.end();
});

//Update user review
router.post("/:id/review", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);

  try {
    movieController.updateReview(parsedId, req.body.review);
  } catch (error) {
    res.render("error", { err: error });
  }
  res.end();
});

//Delete a movie from the watch list
router.post("/:id/delete", (req, res) => {
  const parsedId = parseInt(req.params.id, 10);
  try {
    movieController.removeMovie(parsedId);
  } catch (error) {
    res.render("error", { err: error });
  }
  res.end();
});

//Page displaying movie was successfully deleted
router.get("/:id/delete", (req, res) => {
  res.render("deleteMovie");
});

// Add title to the watch list
router.post("/addToDb", (req, res) => {
  let title = req.body;

  let tempSources = [];

  let tempSourceName = [];
  let tempSourceUrl = [];

  for (const [key, value] of Object.entries(title)) {
    if (key.includes("sourceName")) {
      tempSourceName.push(value);
    }
    if (key.includes("sourceUrl")) {
      tempSourceUrl.push(value);
    }
  }

  tempSourceName.map((currSourceName, index) =>
    tempSources.push({
      sourceName: currSourceName,
      sourceUrl: tempSourceUrl[index],
    })
  );

  let titleSchemaObj = {
    movieID: parseInt(req.body.id),
    imdbID: req.body.imdbId,
    title: req.body.name,
    type: req.body.type,
    year: parseInt(req.body.year),
    poster: req.body.poster,
    rating: 0,
    plot: req.body.plot,
    review: "",
    watched: false,
    sources: tempSources.map((x) => x),
  };

  movieController
    .addMovie(titleSchemaObj)
    .then((data) => {
      res.status(200).send(data);
      res.end();
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status || 500).send({ error: error.message });
    });
});

module.exports = router;
