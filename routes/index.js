const { celebrate } = require('celebrate');
const express = require('express');
const { SIGNUP, SIGNIN } = require('../utils/validation');
const { authorization } = require('../middlewares/authorization');
const userRouter = require('./users');
const movieRouter = require('./movies');

const router = express.Router();

const {
  createUser, login, clearCookie,
} = require('../controllers/users');

router.post('/signup', celebrate(SIGNUP), createUser);

router.post('/signin', celebrate(SIGNIN), login);

router.get('/signout', clearCookie);

router.use(authorization);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
