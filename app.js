const hemlet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CENTRAL_ERROR_HANDLER } = require('./errors/central-error-handler');
const Router = require('./routes/index');
const { DATA_MOVIES } = require('./utils/envConf');
const { limiter } = require('./utils/rateLimit');

const rateLimiter = rateLimit(limiter);

const PORT = 3000;

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
app.use(rateLimiter);
app.use(hemlet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(Router);

app.use(errorLogger);
app.use(errors());

app.use(CENTRAL_ERROR_HANDLER);

app.listen(PORT, () => {
  console.log(`this is port ${PORT}`);
});
