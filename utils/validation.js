const { Joi, Segments } = require('celebrate');
const { urlR } = require('./constants');

// Для auth router

module.exports.SIGNUP = {
  [Segments.BODY]: {
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  },
};

module.exports.SIGNIN = {
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
  },
};

// Для users router

module.exports.PATCH_ME = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
};

// Для movies router

module.exports.CREATE_MOVIE = {
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().pattern(urlR),
    trailerLink: Joi.string().required().pattern(urlR),
    thumbnail: Joi.string().required().pattern(urlR),
    movieId: Joi.number().required(),
  }),
};

module.exports.DELETE_MOVIE = {
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
};
