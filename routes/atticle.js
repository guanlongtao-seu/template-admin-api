const Router = require('koa-router');
const router = new Router();
const apiInstance = require('../api/article');
router.prefix('/api/article');

router.get('/list', apiInstance.list);

module.exports = router;
