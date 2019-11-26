const Koa = require('koa');
const app = new Koa();

const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');

const InitManager = require('./core/init');


const errorHandler = require('./middlewares/excepttion');
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
