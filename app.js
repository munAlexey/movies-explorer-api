const dotenv = require('dotenv');
dotenv.config();
const hemlet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { cors } = require('./middlewares/cors');
const { authorization } = require('./middlewares/authorization');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-errors');
const { CENTRAL_ERROR_HANDLER } = require('./errors/central-error-handler');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const authRouter = require('./routes/auth');
const { errors } = require('celebrate');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('start');
}).catch((res) => {
  res.status(500).send({ message: 'Unauthorized' });
});

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(cors);
app.use(hemlet);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', authRouter);

app.use(authorization);

app.use(userRouter);
app.use(movieRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Роутер не найден'));
});

app.use(errorLogger);
app.use(errors());

app.use(CENTRAL_ERROR_HANDLER);

app.listen(PORT, () => {
  console.log(`this is port ${PORT}`);
});