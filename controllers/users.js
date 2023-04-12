const bcrypt = require('bcrypt');
const User = require('../models/user');

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
      console.log(err);
    })
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.param;
  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .then((user) => {
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
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
};