const { celebrate } = require('celebrate');
const express = require('express');
const { SIGNUP, SIGNIN } = require('../utils/validation');
const { authorization } = require('../middlewares/authorization');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-errors');

const router = express.Router();

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signup', celebrate(SIGNUP), createUser);

router.post('/signin', celebrate(SIGNIN), login);

router.use(authorization);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Роутер не найден'));
});

module.exports = router;
