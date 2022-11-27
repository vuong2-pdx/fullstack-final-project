/** @format */

const axios = require('axios');
const {
  list, // the whole list of movies and tv shows available in US
  movieList, // only movies in the US
  tvList, // only tv shows in the US
  listTotal, // number of items in the list
  movieTotal, // number of items in the movieList
  tvTotal, // number of items in the tvList
} = require('./loadList.js');

// api key for watchmode
const API_KEY = 'XqgRKPmHSMPfDzIWBbyvTxaq6ovVcZezWuqwlFFt';
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
  return list[randNumber].id;
};

// default is return from the whole list so it could be a moive or a show
// if movie type is passed in return only moive
// if tv type is passed in return only tv show
// if the list is passed in, return the selection from the list (assume
// is the watch list)
const randomize = (type) => {
  // randomly pick one from the list
  if (type === undefined) {
    return getData(WATCHMODE_BASE_URL, getRandomID(list, listTotal));
  }
  // movies only
  if (type === 'movie') {
    return getData(WATCHMODE_BASE_URL, getRandomID(movieList, movieTotal));
  }
  // tv shows only
  if (type === 'tv') {
    return getData(WATCHMODE_BASE_URL, getRandomID(tvList, tvTotal));
  }
  // for now assume the saved watch list is passed in
  if (Array.isArray(type) === true) {
    return getData(WATCHMODE_BASE_URL, getRandomID(type, type.length));
  }
};

const getData = async (baseUrl, id) => {
  const url = new URL(`title/${id}/details/`, baseUrl);
  url.searchParams.set('apiKey', API_KEY);

  console.log(url);

  let data = {};

  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err.message));

  return data;
};

module.exports = { randomize };
