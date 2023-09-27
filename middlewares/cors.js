const allowedCors = [
  'https://api.bubaleha.nomoredomains.rocks',
  'https://bubaleha.nomoredomains.monster',
  'localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Methods', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = { cors };
