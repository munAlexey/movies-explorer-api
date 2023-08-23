const { celebrate } = require('celebrate');
const express = require('express');
const { DELETE_MOVIE, CREATE_MOVIE } = require('../utils/validation');

const router = express.Router();

const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate(CREATE_MOVIE), createMovie);

router.delete('/movies/:movieId', celebrate(DELETE_MOVIE), deleteMovie);

module.exports = router;
