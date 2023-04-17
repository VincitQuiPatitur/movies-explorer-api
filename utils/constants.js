const linkRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const idRegex = /[a-f0-9]{24}/;

const ERROR_INCORRECT_MOVIE_DATA_CREATION = 'Incorrect data transmitted during movie creation';
const ERROR_INCORRECT_MOVIE_ID = 'Movie with specified id not found';
const ERROR_INCORRECT_MOVIE_DATA_DELETION = 'Incorrect data transmitted during movie deletion';
const ERROR_INCORRECT_MOVIE_DELETION = 'You can\'t delete this movie';
const ERROR_USER_EMAIL_REGISTERED = 'User with this email is already registered';
const ERROR_INCORRECT_USER_DATA_CREATION = 'Incorrect data transmitted during user creation';
const ERROR_USER_ID_NOT_EXIST = 'User with this id not exist';
const ERROR_USER_ID_NOT_FOUND = 'User with specified id not found';
const ERROR_USER_AUTHORIZATION = 'User is not authorized';
const ERROR_INCORRECT_DATA_USER_UPDATING = 'Incorrect data transmitted when updating user information';

module.exports = {
  linkRegex,
  idRegex,
  ERROR_INCORRECT_MOVIE_DATA_CREATION,
  ERROR_INCORRECT_MOVIE_ID,
  ERROR_INCORRECT_MOVIE_DATA_DELETION,
  ERROR_INCORRECT_MOVIE_DELETION,
  ERROR_USER_EMAIL_REGISTERED,
  ERROR_INCORRECT_USER_DATA_CREATION,
  ERROR_USER_ID_NOT_EXIST,
  ERROR_USER_ID_NOT_FOUND,
  ERROR_USER_AUTHORIZATION,
  ERROR_INCORRECT_DATA_USER_UPDATING,
}