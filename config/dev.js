module.exports = {
  env: 'dev',
  dbTemplate: 'mysql://root:71114411@127.0.0.1/db_template',
  redisData: 'redis://@127.0.0.1:6379',
  EmailSender: {
    host: 'smtp.qq.com',
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: '17639356@qq.com',
      pass: 'yqxcqvfthzqacaac' // QQ邮箱需要使用授权码
    }
  }
}
