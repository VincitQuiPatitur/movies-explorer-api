const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError'); // 400
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404

const {
  ERROR_MOVIES_NOT_FOUND,
  ERROR_INCORRECT_MOVIE_DATA_CREATION,
  ERROR_INCORRECT_MOVIE_ID,
  ERROR_INCORRECT_MOVIE_DATA_DELETION,
  ERROR_INCORRECT_MOVIE_DELETION,
} = require('../utils/constants');

module.exports.getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      if (!movies) {
        next(new NotFoundError(ERROR_MOVIES_NOT_FOUND));
        return;
      }
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_INCORRECT_MOVIE_DATA_CREATION));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(ERROR_INCORRECT_MOVIE_ID));
        return;
      }
      if (userId !== movie.owner.toString()) {
        next(new ForbiddenError(ERROR_INCORRECT_MOVIE_DELETION));
        return;
      }
      Movie.findByIdAndRemove(movieId)
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_INCORRECT_MOVIE_DATA_DELETION));
        return;
      }
      next(err);
    });
};
