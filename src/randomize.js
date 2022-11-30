/** @format */

<<<<<<< HEAD
// Cheng Lin @cchlin
// functions for ranomize

const axios = require('axios');
const {
  list, // the whole list of movies and tv shows available in US
} = require('./loadList.js');
<<<<<<< HEAD
const { base } = require('./Movie.js');

// api key for watchmode
<<<<<<< HEAD
const API_KEY = 'lyNhP8irTapb8pjaEm84nyISUQs4wmywHnJNkGdt';
=======
const API_KEY = '3CP5alQhhvxxhqKJXMqCa0kFf9RagfOFz3S7ZdKe';
>>>>>>> f86784e (randomize from movie or tv or all)
=======
const axios = require("axios");
const {
  list, // the whole list of movies and tv shows available in US
  movieList, // only movies in the US
  tvList, // only tv shows in the US
  listTotal, // number of items in the list
  movieTotal, // number of items in the movieList
  tvTotal, // number of items in the tvList
} = require("./loadList.js");
=======
>>>>>>> d284406 (randmoze page 80%)

// api key for watchmode
const API_KEY = "XqgRKPmHSMPfDzIWBbyvTxaq6ovVcZezWuqwlFFt";
>>>>>>> main
// api key for ombd
const OMDB_API_KEY = "d4eeaaba";

// base url for watchmode
const WATCHMODE_BASE_URL = new URL("https://api.watchmode.com/v1/");
// base url for omdb
const OMDB_BASE_URL = new URL(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`);

// generate a andom index
const getRandomIndex = (totalItem) => Math.floor(Math.random() * totalItem);

// return a IMDb ID randomly pick from the list
const getRandomID = (list, totalItem) => {
  const randNumber = getRandomIndex(totalItem);
  const id = list[randNumber].movieID || list[randNumber].id;
  return id;
};

// if either is passed in return 1 from the whole list
// if movie type is passed in return only moive
// if tv type is passed in return only tv show
// if the list is passed in, return the selection from the list (assume
// is the watch list)
const randomize = (type) => {
  // randomly pick one from the list
  let id;
<<<<<<< HEAD
<<<<<<< HEAD
  if (type === 'either') {
    id = getRandomID(list, list.length);
  }
  // movies only
  if (type === 'Movie') {
    const movieList = list.filter((element) => element.tmdb_type === 'movie');
    id = getRandomID(movieList, movieList.length);
  }
  // tv shows only
  if (type === 'TV Show') {
    const tvList = list.filter((element) => element.tmdb_type === 'tv');
    id = getRandomID(tvList, tvList.length);
  }
  // for now assume the saved watch list is passed in
  if (typeof type === 'object') {
=======
  if (type === undefined) {
    id = getRandomID(list, listTotal);
  }
=======
>>>>>>> d284406 (randmoze page 80%)
  if (type === 'either') {
    id = getRandomID(list, list.length);
  }
  // movies only
<<<<<<< HEAD
  if (type === 'movie') {
    const movieList = list.filter((element) => element.tmdb_type === 'movie');
    id = getRandomID(movieList, movieList.length);
  }
  // tv shows only
  if (type === 'tv') {
<<<<<<< HEAD
    id = getRandomID(tvList, tvTotal);
=======
  if (type === "movie") {
    return getData(OMDB_BASE_URL, getRandomID(movieList, movieTotal));
  }
  // tv shows only
  if (type === "tv") {
    return getData(OMDB_BASE_URL, getRandomID(tvList, tvTotal));
>>>>>>> main
=======
    const tvList = list.filter((element) => element.tmdb_type === 'movie');
    id = getRandomID(tvList, tvList.length);
>>>>>>> d284406 (randmoze page 80%)
  }
  // for now assume the saved watch list is passed in
<<<<<<< HEAD
  if (Array.isArray(type) === true) {
>>>>>>> f86784e (randomize from movie or tv or all)
=======
  if (typeof type === 'object') {
>>>>>>> fb6b4eb (randomize from watch list added)
    id = getRandomID(type, type.length);
  }
  // getStreamingSouces(id);
  return getData(WATCHMODE_BASE_URL, id);
};

const getSource = (sourceList) => {};

const getData = async (baseUrl, id) => {
<<<<<<< HEAD
  const url = new URL(`title/${id}/details/`, baseUrl);
  url.searchParams.set('apiKey', API_KEY);
=======
  const url = new URL(baseUrl);
  url.searchParams.set("i", id);
>>>>>>> main

<<<<<<< HEAD
=======
  // console.log(url);

>>>>>>> f86784e (randomize from movie or tv or all)
  let data = {};

  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err.message));

  return data;
};

<<<<<<< HEAD
const getStreamingSources = async (id) => {
  const url = new URL(`title/${id}/sources/`, WATCHMODE_BASE_URL);
  url.searchParams.set('apiKey', API_KEY);
  url.searchParams.set('regions', 'US');

  let data = []; // create a array to return
  await axios
    .get(url)
    .then((response) => {
      let unique = []; // temp array to check if the sources exist
      response.data.map((element) => {
        // map through all the source
        if (!unique.includes(element.name)) {
          // if the source name is not found, push it
          data.push({ sourceName: element.name, sourceUrl: element.web_url });
          unique.push(element.name);
          return true;
        }
        return false;
      });
    })
    .catch((err) => console.log(err.message));
  return data;
};

module.exports = { randomize, getStreamingSources };
=======
// const getStreamingSouces = async (id) => {
//   const url = `https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${API_KEY}`;
//   console.log(url);

//   let data = {};
//   await axios
//     .get(url)
//     .then((response) => {
//       data = response.data;
//       console.log(data);
//     })
//     .catch((err) => console.log(err.message));

//   return data;
// };

module.exports = { randomize };
>>>>>>> f86784e (randomize from movie or tv or all)
