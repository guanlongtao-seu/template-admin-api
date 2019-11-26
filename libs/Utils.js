/** 获得四位随机码 **/
exports.getFourDigitCode = function () {
  return Math.floor(Math.random() * 9000) + 1000;
}
