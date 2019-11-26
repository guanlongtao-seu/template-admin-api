class HttpException extends Error {
  constructor(data = {}) {
    super();
    this.errorCode = data.errorCode || 0;
    this.code = data.code || 200;
    this.message = data.message || ''
  }
}

// 登录异常类
class LoginException extends HttpException {
  constructor(data) {
    super();
    this.code = 401;
    this.errorCode = data.errorCode;
    this.message = data.message
  }
}
// 参数异常类
class ParameterException extends HttpException {
  constructor(data) {
    super();
    this.code = 400;
    this.errorCode = data.errorCode;
    this.message = data.message
  }
}
module.exports = {
  HttpException,
  LoginException,
  ParameterException
}
