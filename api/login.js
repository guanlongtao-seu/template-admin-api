const { LoginException, ParameterException } = require('../core/http-exception');
const { TBAccount } = require('../db/table');
const BaseService = require('../service/BaseService');
const baseAccountService = new BaseService(TBAccount);
const ErrorInfo = require('../constant/ErrorInfo');
const EmailSender = require('../libs/EmailSender');
const RedisCache = require('../libs/RedisCache');
const { getFourDigitCode, getMD5 } = require('../libs/Utils');

// 密码登录
exports.login = async function(ctx) {
  const { email, password } = ctx.request.body;
  const filter = { email };
  const account = await baseAccountService.findItemByFilter(filter);
  const md5Pwd = getMD5(password);
  if (!(account && account.password === md5Pwd)) {
    throw new LoginException(ErrorInfo.MatchedError)
  }
  ctx.session = {
    id: account.id,
    username: account.username,
    email,
    phone: account.phone
  };
  console.log(ctx.session);
  ctx.body = {
    errorCode: 0,
    message: '登录成功'
  }
};

// 获取邮箱验证码
exports.getVerificationCode = async function(ctx) {
  const { email } = ctx.request.query;
  if (!email) {
    throw new ParameterException(ErrorInfo.MissingRequiredParams)
  }
  const sender = new EmailSender();
  const code = getFourDigitCode();
  const redisCache = new RedisCache();
  await redisCache.set(`email:login:${email}`, code);
  await sender.sendMail({subject: '登录验证码', to: email, text: code});

  ctx.body = {
    errorCode: 0,
    message: '获取成功'
  }
};

// 邮箱验证码登录
exports.verificationCodeLogin = async function(ctx) {
  const { email, code } = ctx.request.body;
  if (!email || !code) {
    throw new ParameterException(ErrorInfo.MissingRequiredParams)
  }
  const filter = { email };
  const account = await baseAccountService.findItemByFilter(filter);
  if (!account) {
    throw new LoginException(ErrorInfo.NoUserError);
  }
  const redisCache = new RedisCache();
  const redisCode = await redisCache.get(`email:login:${email}`);
  if (redisCode !== code) {
    throw new LoginException(ErrorInfo.VerificationCodeError)
  }
  ctx.session = {
    id: account.id,
    username: account.username,
    email,
    phone: account.phone
  };
  ctx.body = {
    errorCode: 0,
    message: '登录成功'
  }
};

// 登出
exports.logout = async function (ctx) {
  ctx.session = null;
  return ctx.body = {
    errorCode: 0,
    message: '登出成功'
  }
};

// 登录后从session中拿到用户信息
exports.getAccountInfo = async function(ctx){
  const account = {id, username, email, phone} = ctx.session;
  ctx.body = {
    errorCode: 0,
    message: '',
    data: account
  };
};
