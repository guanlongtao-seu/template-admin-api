const crypto = require('crypto');

/** 获得四位随机码 **/
exports.getFourDigitCode = function () {
  return Math.floor(Math.random() * 9000) + 1000;
};

/** MD5 加密 **/
exports.getMD5 = function (text) {
  return crypto.createHash('md5').update(text, 'utf8').digest('hex');
};
