const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateLogin, validateUserCreation } = require('../middlewares/userValidation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_NOT_FOUND } = require('../utils/constants');

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', validateUserCreation, createUser);
// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError(ERROR_NOT_FOUND));
});

module.exports = router;
