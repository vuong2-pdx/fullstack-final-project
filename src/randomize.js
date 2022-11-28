/** @format */

const axios = require('axios');
const {
  list, // the whole list of movies and tv shows available in US
} = require('./loadList.js');

// api key for watchmode
const API_KEY = '3CP5alQhhvxxhqKJXMqCa0kFf9RagfOFz3S7ZdKe';
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

// default is return from the whole list so it could be a moive or a show
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
  if (type === 'movie') {
    const movieList = list.filter((element) => element.tmdb_type === 'movie');
    id = getRandomID(movieList, movieList.length);
  }
  // tv shows only
  if (type === 'tv') {
    const tvList = list.filter((element) => element.tmdb_type === 'movie');
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

  // console.log(url);

  let data = {};

  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((err) => console.log(err.message));

  return data;
};

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
