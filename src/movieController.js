// Viktoriya Petrova @ViktoriyaPetrova
// Movie controller for the Movie schema

//These are all the methods that can be used to access the database

const Movie = require("./Movie");

//The "movie" argument is an object where the movieID field is required (see Movie.js)
//If the field is left blank, these methods will throw an error.

//Add a movie to the DB, movie is an JS object
async function addMovie(movie) {
  if (!movie.movieID) {
    throw new Error("MovieID field was empty");
  }
  const exists = await Movie.findOne({ movieID: movie.movieID }).exec();
  if (exists) {
    throw new Error("Movie already exists in the database");
  }

  const success = await Movie.create(movie); //returns a promise

  if (!success) {
    throw new Error("Movie could not be added to the database");
  }
  console.log("Movie added.");
}

//Remove a movie from the DB, is is a number
async function removeMovie(id) {
  if (!id) {
    throw new Error("MovieID field was empty");
  }

  const success = await Movie.deleteOne({ movieID: id }); // returns {deletedCount: 1}

  if (success.deletedCount === 0) {
    throw new Error("Movie could not be deleted from the database");
  }

  console.log("Movie deleted.");
}

//Retrieve the info of one movie, id is a number
async function findMovie(id) {
  console.log(`FROM CONTROLLER: ${id}`);
  if (!id) {
    throw new Error("MovieID field was empty");
  }

  const result = await Movie.findOne({ movieID: id }).exec(); //returns query
  if (!result) {
    throw new Error("Movie does not exist");
  }
  console.log("Movie found.");
  return result;
}

//Retrieve all movies saved in the DB, returns a promise
async function retrieveAllMovies() {
  const result = await Movie.find({});
  if (!result) {
    throw new Error("There are no saved movies");
  }
  console.log("Success.");
  return result;
}

//Update a movie, movie is a JS object
async function updateMovie(movie) {
  if (!movie.movieID) {
    throw new Error("MovieID field was empty");
  }
  const success = await Movie.replaceOne({ movieID: movie.movieID });
  if (!success.acknowledged) {
    throw new Error("Movie could not be updated");
  }
  console.log("Movie updated");
}

module.exports = {
  addMovie,
  removeMovie,
  findMovie,
  retrieveAllMovies,
  updateMovie,
};
