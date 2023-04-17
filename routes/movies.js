const router = require('express').Router();
const { validateMovieCreation, validateMovieById } = require('../middlewares/movieValidation');

const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getSavedMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description, image
// trailerLink, nameRU, nameEN и thumbnail, movieId
router.post('/', validateMovieCreation, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validateMovieById, deleteMovie);

module.exports = router;
