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
  let watched = true;
  const parsedId = parseInt(req.params.id, 10);
  if (req.body.watched === "watched") {
    watched = false;
  }
  movieController.updateWatched(parsedId, watched);
  res.end();
});

module.exports = router;
