const dotenv = require('dotenv');

dotenv.config();

const {
  PORT = 3000,
  DATA_MOVIES = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = 'super-strong-key',
} = process.env;

module.exports = {
  PORT,
  DATA_MOVIES,
  JWT_SECRET,
};
