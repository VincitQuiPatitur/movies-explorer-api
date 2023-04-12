const router = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserInfo);

module.exports = router;
