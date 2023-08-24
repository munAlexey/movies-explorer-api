const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-errors');
const BadRequestError = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');
const ErrorConflict = require('../errors/error-conflict');
const { JWT_SECRET } = require('../utils/envConf');

module.exports.getMe = async (req, res, next) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.patchMe = async (req, res, next) => {
  const myId = req.user._id;
  const { name, email } = req.body;

  await User.findByIdAndUpdate(
    myId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((myInfo) => {
      res.send(myInfo);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else if (err.code === 11000) {
        next(new ErrorConflict('Такой email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new Unauthorized('Invalid email or password');
    })
    .then(async (user) => {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          })
          .send(user.toJSON());
      } else {
        throw new Unauthorized('Invalid email or password');
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  await bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((newUser) => {
        res.send({ data: newUser.toJSON() });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError('Переданы некорректные данные.'));
        } else if (err.code === 11000) {
          next(new ErrorConflict('Данный email уже зарегистрирован'));
        } else {
          next(err);
        }
      });
  });
};

module.exports.clearCookie = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Token не найден в Cookies'));
  } else {
    res.clearCookie('jwt').send({ message: 'Выход' });
  }
};
