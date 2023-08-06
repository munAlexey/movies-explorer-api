const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-errors');
const BadRequestError = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

module.exports.getMovies = async (req, res, next) => {
  Movie.find({}).populate(['owner', 'likes'])
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => next(err));
};

module.exports.createMovie = async (req, res, next) => {
  const { name, link, ownerId } = req.body;

  await Movie.create({ name, link, owner: ownerId })
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
      if (userId !== foundMovie.owner.id) {
        next(new Forbidden('Нельзя удалять чужие карточки.'));
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
