const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateLogin, validateUserCreation } = require('../middlewares/userValidation');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

// создаёт пользователя с переданными в теле email, password и name
router.post('/signup', validateUserCreation, createUser);
// проверяет переданные в теле почту и пароль и возвращает JWT
router.post('/signin', validateLogin, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('The page or resource you\'re looking for can\'t be found'));
});

module.exports = router;
