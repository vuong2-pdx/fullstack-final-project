const Movie = require("./Movie");

//The "movie" argument is an object where the movieID field is required (see Movie.js)
//If the field is left blank, these methods will throw an error.

//Add a movie to the DB
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

//Remove a movie from the DB
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

//Retrieve the info of one movie
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

//Retrieve all movies saved in the DB
async function retrieveAllMovies() {
  const result = await Movie.find({});
  if (!result) {
    throw new Error("There are no saved movies");
  }
  console.log("Success.");
  //   console.log(result);
  return result;
}

//Update a movie
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
