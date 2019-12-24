module.exports = {
  env: 'pro',
  dbTemplate: 'mysql://root:@71114411Seu@111.231.94.127/db_template',
  redisData: 'redis://@111.231.94.127:6379',
  EmailSender: {
    host: 'smtp.163.com',
    secureConnection: true, // use SSL
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
      user: 'email_sender_g@163.com',
      pass: '71114411Seu' //  授权码
    }
  }
}
