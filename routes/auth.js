const { celebrate } = require('celebrate');
const express = require('express');
const { SIGNUP, SIGNIN } = require('../utils/validation');

const router = express.Router();

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', celebrate(SIGNUP), createUser);

router.post('/signin', celebrate(SIGNIN), login);

module.exports = router;
