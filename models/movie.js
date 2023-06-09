const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { ObjectId } = mongoose.Schema.Types;

const { ERROR_URL_FORMAT } = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
        message: ERROR_URL_FORMAT,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
        message: ERROR_URL_FORMAT,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v),
        message: ERROR_URL_FORMAT,
      },
    },
    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
