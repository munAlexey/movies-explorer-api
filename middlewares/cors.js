const allowedCors = [
  'https://bubaleha.nomoredomains.monster',
  'http://bubaleha.nomoredomains.monster',
  'https://api.bubaleha.nomoredomains.rocks',
  'http://api.bubaleha.nomoredomains.rocks',
  'http://localhost:3000',
];

const Cors = (req, res, next) => {
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['Access-Control-Allow-Headers'];

  if (allowedCors.includes()) {
    res.header('Access-Control-Allow-Origin', '*');
    res.headers('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.headers('Access-Control-Allow-Credentials', true);
    return res.end();
  }

  return next();
};

module.exports = { Cors };
