const { celebrate, Joi } = require('celebrate');
const { linkRegex, idRegex } = require('../utils/constants');

module.exports.validateMovieCreation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkRegex),
    trailer: Joi.string().required().regex(linkRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(linkRegex),
    movieId: Joi.string().required().regex(idRegex),
  }),
});

module.exports.validateMovieById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(idRegex),
  }),
});
