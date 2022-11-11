var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("watchList", {
    heading: "Watch List",
    movieID: "/WatchList/123456",
    results: [
      "https://placekitten.com/600/300",
      "https://placekitten.com/600/300",
      "https://placekitten.com/600/300",
      "https://placekitten.com/600/300",
      "https://placekitten.com/600/300",
      "https://placekitten.com/600/300",
    ],
  });
});

router.get("/*", (req, res) => {
  res.render("movie", {
    title: "Breaking Bad",
    poster: "https://placekitten.com/600/300",
    rating: "5",
    review:
      "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    watched: true,
  });
});

module.exports = router;
