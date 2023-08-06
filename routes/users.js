const { Joi, celebrate, Segments } = require('celebrate');
const express = require('express');
const { urlR } = require('../utils/constants');

const router = express.Router();

const {
  patchMe, getMe,
} = require('../controllers/users');

router.get('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getMe);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email()
  }),
}), patchMe);

module.exports = router;
