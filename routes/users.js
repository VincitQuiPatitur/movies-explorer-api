const router = require('express').Router();
const { validateUserInfoUpdates } = require('../middlewares/userValidation');

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateUserInfoUpdates, updateUserInfo);

module.exports = router;
