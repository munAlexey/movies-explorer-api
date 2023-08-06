const { Joi, celebrate, Segments } = require('celebrate');
const express = require('express');
const { urlR } = require('../utils/constants');

const router = express.Router();

const {
  deleteMovie, createMovie, getMovies,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(1).max(5000),
    nameRU: Joi.string().required().min(1).max(100),
    nameEN: Joi.string().required().min(1).max(100),
    image: Joi.string().required().pattern(urlR),
    trailer: Joi.string().required().pattern(urlR),
    thumbnail: Joi.string().required().pattern(urlR),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  [Segments.BODY]: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovie);

module.exports = router;
