const ErrorInfo = require('../constant/ErrorInfo');
const {LoginException} = require('../core/http-exception');

// 不需要登录酒客访问的接口列表
const noLoginPath = new Set([
  '/',
  '/api/login', //登录
  '/api/login/getVerificationCode', //获取邮箱验证码
  '/api/login/verificationCodeLogin', //邮箱验证码登录
  '/test' //测试接通
]);

module.exports = async function(ctx, next) {
  if (ctx.path.indexOf('/api')) {
    return await next();
  } // TODO

  const isLoginRequired = !noLoginPath.has(ctx.path);
  const {id} = ctx.session;
  if (!id && isLoginRequired) {
    throw new LoginException(ErrorInfo.NoLoginError)
  }

  await next();
};
