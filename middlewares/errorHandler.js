const { INTERNAL_SERVER_ERROR } = require('../errors/errors');
const { ERROR_ON_SERVER } = require('../utils/constants');

module.exports.errorHandler = ((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(INTERNAL_SERVER_ERROR).send({ message: ERROR_ON_SERVER });
  }
  next();
});
