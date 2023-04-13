const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { SECRET_KEY_DEV } = require('../errors/errors');

const handleAuthError = (res, next) => next(new UnauthorizedError('Authorisation required'));

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res, next);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY_DEV);
  } catch (err) {
    return handleAuthError(res, next);
  }

  req.user = payload;
  return next();
};
