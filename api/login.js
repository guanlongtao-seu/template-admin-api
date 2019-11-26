const { LoginException, ParameterException } = require('../core/http-exception');
const { TBUser } = require('../db/table');
const errorInfo = require('../constant/errorInfo');
const EmailSender = require('../libs/EmailSender');
const RedisCache = require('../libs/RedisCache');
const { getFourDigitCode } = require('../libs/Utils');

exports.login = async function(ctx) {
  await TBUser.findOne({
    where: {
      id: 1
    }
  });
  throw new LoginException(errorInfo.MatchedError)
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
