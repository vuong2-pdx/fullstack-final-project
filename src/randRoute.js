// Cheng Lin @cchlin
// Router for /random endpoint

const express = require('express');
const router = express.Router();

const movieController = require('./movieController');
const randomize = require('./randomize');

let data = { type: '', item: {} };
router.get('/', async (req, res) => {
  const tmdbType = data.item.tmdb_type === 'Movie' ? 'Movie' : 'TV Show';

  res.render('random', {
    init: 'CLICK ONE TO START',
    Dtype: data.type,
    title: 'Choose for Me',
    subheading: data.item.title,
    poster: data.item.poster,
    rating: data.item.user_rating || 'null',
    tmdbType: tmdbType,
    year: data.item.year,
    plot: data.item.plot_overview,
    id: data.item.id,
  });

  res.end();
});

router.post('/:type', async (req, res) => {
  const type = req.body.type;
  if (type === 'watchList') {
    console.log('entered watche list');
    let list = await movieController.retrieveAllMovies();
    data.item = await randomize.randomize(list);
  } else {
    data.item = await randomize.randomize(type);
  }

  res.end();
});

router.get('/:id', async (req, res) => {
  const id = req.url.split('/').pop();
  const param = data.item.trailer.toString().split('=').pop();
  const trailer = new URL(param, 'https://www.youtube.com/embed/');
  const sources = await randomize.getStreamingSources(id); //get streaming source
  let saved = await movieController.has(id); // check if it's in the watched list

  res.render('randDisplay', {
    data: data.item,
    trailer: trailer,
    source: sources,
    saved: saved,
  });

  res.end();
});

// add the movie to watch list
router.post('/:id/add', async (req, res) => {
  movieController
    .addMovie(req.body)
    .then(() => {
      console.log('Add success');
    })
    .catch((err) => {
      console.log('Add failed');
      console.log(err);
    });

  res.end();
});

module.exports = router;
