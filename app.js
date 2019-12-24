const Koa = require('koa');
const app = new Koa();

const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');

const InitManager = require('./core/init');


const errorHandler = require('./middlewares/Exception');
const session = require('./middlewares/Session');
const checker = require('./middlewares/SessionChecker');

const RedisStore  = require("./libs/RedisStore");

const {redisSession} = require("./config");


// 全局异常处理
app.use(errorHandler);
app.use(cors({
  origin: function (ctx) {
    return ctx.get('Origin')
  },
  credentials: true,
  maxAge: 60,
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));

// 使用session中间件
app.use(session({
  key      : 'sessionId',
  maxAge   : 1000 * 3600 * 4,
  expires  : new Date(Date.now() + 1000 * 3600 * 4),
  httpOnly : true,
  overwrite: false,
  store    : new RedisStore(redisSession)
}));
app.use(checker);
// app.use(json())
// app.use(logger())
// app.use(require('koa-static')(__dirname + '/public'))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })


// error-handling
// app.on('error', (err, ctx) => {
//   console.error('server error', err, ctx)
// });

InitManager.initCore(app)


module.exports = app
