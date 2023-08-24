module.exports.CENTRAL_ERROR_HANDLER = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log(next); // eslint ругается
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};
