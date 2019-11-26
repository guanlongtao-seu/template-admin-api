const { LoginException, ParameterException } = require('../core/http-exception');
const { TBUser } = require('../db/table');
const errorInfo = require('../constant/errorInfo');
const EmailSender = require('../libs/EmailSender');
const RedisCache = require('../libs/RedisCache');
const { getFourDigitCode, getMD5 } = require('../libs/Utils');

// 密码登录
exports.login = async function(ctx) {
  const { email, password } = ctx.request.body;
  const user = await TBUser.findOne({ where: { email } });
  const md5Pwd = getMD5(password);
  if (user && user.password !== md5Pwd) {
    throw new LoginException(errorInfo.MatchedError)
  }
  ctx.body = {
    code: 0,
    message: '登录成功'
  }
};

// 获取邮箱验证码
exports.getVerificationCode = async function(ctx) {
  const { email } = ctx.request.query;
  if (!email) {
    throw new ParameterException(errorInfo.MissingRequiredParams)
  }
  const sender = new EmailSender();
  const code = getFourDigitCode();
  const redisCache = new RedisCache();
  await redisCache.set(`email:login:${email}`, code);
  await sender.sendMail({subject: '登录验证码', to: email, text: code});

  ctx.body = {
    code: 0,
    message: '获取成功'
  }
};
