const Router = require('koa-router');
const router = new Router();
const apiInstance = require('../api/image');
router.prefix('/api/image');

router.get('/list', apiInstance.list);

module.exports = router;
