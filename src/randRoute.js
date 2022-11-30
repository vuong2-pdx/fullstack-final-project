<<<<<<< HEAD
<<<<<<< HEAD
// Cheng Lin @cchlin
// Router for /random endpoint

=======
>>>>>>> 0920174 (randomize all done)
=======
// Cheng Lin @cchlin
// Router for /random endpoint

>>>>>>> 456b1a4 (about page)
const express = require('express');
const router = express.Router();

const movieController = require('./movieController');
const randomize = require('./randomize');

let data = { type: '', item: {} };
router.get('/', async (req, res) => {
<<<<<<< HEAD
  const tmdbType = data.item.tmdb_type === 'Movie' ? 'Movie' : 'TV Show';

  res.render('random', {
    init: 'CLICK ONE TO START',
    Dtype: data.type,
=======
  const tmdbType = data.item.tmdb_type === 'movie' ? 'Movie' : 'TV Show';

  res.render('random', {
    init: 'CLICK ONE TO START',
    type: data.type,
>>>>>>> 0920174 (randomize all done)
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
<<<<<<< HEAD
  if (type === 'watchList') {
=======
  data.type = type;
  if (data.type === 'watchList') {
>>>>>>> 0920174 (randomize all done)
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
