const Router = require('koa-router');
const router = new Router();
const apiInstance = require('../api/configCenter');
router.prefix('/api/config');

router.get('/imageList', apiInstance.imageList);

module.exports = router;
