const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-errors');
const BadRequestError = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getMovies = async (req, res, next) => {
  const userId = req.user._id;

  Movie.find({owner: userId})
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => next(err));
};

module.exports.createMovie = async (req, res, next) => {
  const { country, director, duration, year, description,
    image, trailerLink, thumbnail, movieId, nameRU, nameEN, } = req.body;

  await Movie.create({ country, director, duration, year, description,
    image, trailerLink, thumbnail, owner: userId, movieId, nameRU, nameEN, })
    .then((newMovie) => {
      res.send({ data: newMovie });
    })
    .catch((err) => {
      if ((err.name === 'ValidationError')) {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = async (req, res, next) => {
  const userId = req.user._id;
  const movie = req.params.movieId;

  Movie.findById(movie).orFail(() => {
    throw new NotFoundError('NotFound');
  })
    .then((foundMovie) => {
      if (foundMovie.owner.equals(userId)) {
        return next(new Forbidden('Нельзя удалять чужие фильмы.'));
      }
      Movie.findByIdAndDelete(foundMovie)
        .orFail(() => {
          throw new NotFoundError('NotFound');
        })
        .then((result) => {
          res.send(result);
        }).catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else { next(err); }
    });
};
