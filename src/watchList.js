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
        });
      },
      (error) => {
        console.log(error);
        res.render("error", {
          err: error,
        });
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

module.exports = router;
