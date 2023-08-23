const hemlet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found-errors');
const { CENTRAL_ERROR_HANDLER } = require('./errors/central-error-handler');

const { DATA_MOVIES } = require('./utils/envConf');

const PORT = 3000;
const authRouter = require('./routes/index');

const app = express();

mongoose.connect(DATA_MOVIES, {
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
app.use(hemlet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(authRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Роутер не найден'));
});

app.use(errorLogger);
app.use(errors());

app.use(CENTRAL_ERROR_HANDLER);

app.listen(PORT, () => {
  console.log(`this is port ${PORT}`);
});
