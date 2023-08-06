/* eslint-disable prefer-regex-literals */
module.exports.ERROR_INCORRECT_DATA = 400;
module.exports.ERROR_UNAUTHORIZED = 401;
module.exports.ERROR_NOT_FOUND = 404;
module.exports.ERROR_DEFAULT = 500;
// eslint-disable-next-line no-control-regex, no-useless-escape
module.exports.urlR = new RegExp('https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)');
