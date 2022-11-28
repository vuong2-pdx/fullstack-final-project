// Viktoriya Petrova @ViktoriyaPetrova
// Movie Schema exported as a module

const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieID: { type: Number, required: [true, "Please add a movie ID"] },
  imbdID: Number,
  title: String,
  type: String,
  year: Number,
  poster: String,
  rating: Number,
  plot: String,
  review: String,
  watched: Boolean,
  sources: [{ sourceName: String, sourceUrl: String }],
});

module.exports = mongoose.model("Movie", movieSchema);
