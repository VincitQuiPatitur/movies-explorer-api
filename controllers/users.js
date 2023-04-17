const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const ConflictError = require('../errors/ConflictError'); // 409

const {
  ERROR_USER_EMAIL_REGISTERED,
  ERROR_INCORRECT_USER_DATA_CREATION,
  ERROR_USER_ID_NOT_EXIST,
  ERROR_USER_ID_NOT_FOUND,
  ERROR_INCORRECT_DATA_USER_UPDATING,

} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_USER_EMAIL_REGISTERED));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_INCORRECT_USER_DATA_CREATION));
        return;
      }
      next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.param;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ERROR_USER_ID_NOT_EXIST));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_USER_ID_NOT_FOUND));
        return;
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ERROR_USER_ID_NOT_EXIST));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(ERROR_USER_ID_NOT_EXIST));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(ERROR_USER_EMAIL_REGISTERED));
        return;
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_INCORRECT_DATA_USER_UPDATING));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY_DEV',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
