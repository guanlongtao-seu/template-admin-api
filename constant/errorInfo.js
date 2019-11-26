const errorInfo = {
  // 位置错误
  UnknownError: { errorCode: -1, message: '服务器出现未知问题'},
  // 成功
  Success: { errorCode: 0, message: 'OK'},
  // 登录错误
  MatchedError: { errorCode: 10001, message: '用户名或密码错误'},
  // 授权错误

  // 服务器错误
  DBError: { errorCode: 50001, message: '数据库操作异常'},

  // 参数
  MissingRequiredParams: { errorCode: 30001, message: '必填参数缺失'}

}

module.exports = errorInfo
