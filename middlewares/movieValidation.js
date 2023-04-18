const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');

module.exports.validateMovieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegex),
    trailerLink: Joi.string().required().regex(linkRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(linkRegex),
    movieId: Joi.number().required().unsafe(),
  }),
});

module.exports.validateMovieById = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
