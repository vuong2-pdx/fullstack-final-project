/** @format */

// Cheng Lin @cchlin
// functions for ranomize

const axios = require('axios');
const {
  list, // the whole list of movies and tv shows available in US
} = require('./loadList.js');
const { base } = require('./Movie.js');

// api key for watchmode
const API_KEY = 'ANmtzWiO5mDgI5rq5b1tYnqpggG9AOcxByLkAaa0';
// api key for ombd
const OMDB_API_KEY = 'd4eeaaba';

// base url for watchmode
const WATCHMODE_BASE_URL = new URL('https://api.watchmode.com/v1/');
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
    id = getRandomID(type, type.length);
  }
  // getStreamingSouces(id);
  return getData(WATCHMODE_BASE_URL, id);
};

const getData = async (baseUrl, id) => {
  const url = new URL(`title/${id}/details/`, baseUrl);
  url.searchParams.set('apiKey', API_KEY);

  let data = {};

  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err.message));

  return data;
};

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
