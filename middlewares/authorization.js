const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');
const { JWT_SECRET } = require('../utils/envConf');

module.exports.authorization = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new Unauthorized('Нужно авторизоваться'));
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new Unauthorized('Неверные данные'));
  }
};
