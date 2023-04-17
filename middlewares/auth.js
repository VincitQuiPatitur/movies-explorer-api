const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { ERROR_USER_AUTHORIZATION } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res, next) => next(new UnauthorizedError(ERROR_USER_AUTHORIZATION));

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, next);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY_DEV');
  } catch (err) {
    return handleAuthError(res, next);
  }

  req.user = payload;
  return next();
};
