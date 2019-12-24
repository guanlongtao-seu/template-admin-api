const Router = require('koa-router');
const router = new Router();

router.get('/test', async function(ctx) {
  ctx.body = {
    errorCode: 0,
    message: 'API接口测试连接完成！'
  }
});

module.exports = router;
