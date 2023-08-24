const { celebrate } = require('celebrate');
const express = require('express');
const { DELETE_MOVIE, CREATE_MOVIE } = require('../utils/validation');

const router = express.Router();

const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

router.get(getMovies);

router.post(celebrate(CREATE_MOVIE), createMovie);

router.delete('/:movieId', celebrate(DELETE_MOVIE), deleteMovie);

module.exports = router;
