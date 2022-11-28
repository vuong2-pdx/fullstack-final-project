/** @format */

const fs = require('fs');

// {id, title, year, imdb_id, tmdb_id, tmdb_type, type}

// path for the id mapping json file
const filePath = './src/list.json';

const readList = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

// // turn the csv id mapping data to array
const list = readList(filePath);

module.exports = {
  list,
};
