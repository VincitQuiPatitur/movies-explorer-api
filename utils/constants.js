const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const linkRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const idRegex = /[a-f0-9]{24}/;

const ERROR_MOVIES_NOT_FOUND = 'This user\'s films were not found';
const ERROR_INCORRECT_MOVIE_DATA_CREATION = 'Incorrect data transmitted during movie creation';
const ERROR_INCORRECT_MOVIE_ID = 'Movie with specified id not found';
const ERROR_INCORRECT_MOVIE_DATA_DELETION = 'Incorrect data transmitted during movie deletion';
const ERROR_INCORRECT_MOVIE_DELETION = 'You can\'t delete this movie';
const ERROR_USER_EMAIL_REGISTERED = 'User with this email is already registered';
const ERROR_INCORRECT_USER_DATA_CREATION = 'Incorrect data transmitted during user creation';
const ERROR_USER_ID_NOT_EXIST = 'User with this id not exist';
const ERROR_USER_ID_NOT_FOUND = 'User with specified id not found';
const ERROR_INCORRECT_DATA_USER_UPDATING = 'Incorrect data transmitted when updating user information';
const ERROR_WRONG_EMAIL_OR_PASSWORD = 'Wrong email or password';
const ERROR_USER_AUTHORIZATION = 'Authorisation required';
const ERROR_ON_SERVER = 'Error has occurred on the server';
const ERROR_NOT_FOUND = 'The page or resource you\'re looking for can\'t be found';

const ERROR_URL_FORMAT = 'Некорректный URL-формат';
const ERROR_EMAIL_FORMAT = 'Неправильный формат почты';

module.exports = {
  PORT,
  MONGO_URL,
  linkRegex,
  idRegex,
  ERROR_MOVIES_NOT_FOUND,
  ERROR_INCORRECT_MOVIE_DATA_CREATION,
  ERROR_INCORRECT_MOVIE_ID,
  ERROR_INCORRECT_MOVIE_DATA_DELETION,
  ERROR_INCORRECT_MOVIE_DELETION,
  ERROR_USER_EMAIL_REGISTERED,
  ERROR_INCORRECT_USER_DATA_CREATION,
  ERROR_USER_ID_NOT_EXIST,
  ERROR_USER_ID_NOT_FOUND,
  ERROR_INCORRECT_DATA_USER_UPDATING,
  ERROR_WRONG_EMAIL_OR_PASSWORD,
  ERROR_USER_AUTHORIZATION,
  ERROR_ON_SERVER,
  ERROR_URL_FORMAT,
  ERROR_EMAIL_FORMAT,
  ERROR_NOT_FOUND,
};
