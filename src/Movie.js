//Movie Schema exported as a module
const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieID: { type: Number, required: [true, "Please add a movie ID"] },
  title: String,
  poster: String,
  rating: Number,
  review: String,
  watched: Boolean,
  //sources: [{name: String, url: String}], ???
});

module.exports = mongoose.model("Movie", movieSchema);
