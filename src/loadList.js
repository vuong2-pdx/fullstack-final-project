/** @format */

const fs = require('fs');

// [IMBD ID, TMDB ID, IMDB Type, Title, year]

// path for the id mapping csv file
const csvFile = './src/title_id_map.csv';

const readList = (path) => {
  // covert the data into array of objects
  const toArray = (source) =>
    source
      .split('\n') // split by line
      .slice(1) // cut the schema row
      .map((row) => {
        // split by comma and cut the watchmode id column
        const item = row.split(',').slice(1);
        return {
          imdbID: item[0],
          tmdbID: item[1],
          type: item[2],
          title: item[3],
          year: item[4],
        };
      });

  try {
    const data = fs.readFileSync(path, 'utf8');
    return toArray(data);
  } catch (err) {
    console.error(err);
  }
};

// // turn the csv id mapping data to array
const list = readList(csvFile);
const movieList = list.filter((element) => element.type === 'movie');
const tvList = list.filter((element) => element.type === 'tv');
// get the max index of the data array
const listTotal = list.length;
const movieTotal = movieList.length;
const tvTotal = tvList.length;

module.exports = {
  list,
  movieList,
  tvList,
  listTotal,
  movieTotal,
  tvTotal,
};
