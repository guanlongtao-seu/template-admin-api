const errorInfo = {
  // 未知错误
  UnknownError: { errorCode: -1, message: '服务器出现未知问题'},
  // 成功
  Success: { errorCode: 0, message: 'OK'},
  // 登录错误
  MatchedError: { errorCode: 10001, message: '用户名或密码错误'},
  NoLoginError: { errorCode: 10002, message: '用户未登录'},
  NoUserError: { errorCode: 10003, message: '用户不存在'},
  VerificationCodeError: { errorCode: 10004, message: '验证码错误'},

  // 授权错误

  // 服务器错误
  DBError: { errorCode: 50001, message: '数据库操作异常'},

  // 参数
  MissingRequiredParams: { errorCode: 30001, message: '必填参数缺失'}

}

module.exports = errorInfo
