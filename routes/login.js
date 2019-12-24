const Router = require('koa-router')
const router = new Router()
const apiInstance = require('../api/login')
router.prefix('/api/login')

router.post('/', apiInstance.login);
router.get('/getVerificationCode', apiInstance.getVerificationCode);
router.post('/verificationCodeLogin', apiInstance.verificationCodeLogin);
router.post('/logout', apiInstance.logout);
// 获取用户基本信息
router.get('/getAccountInfo', apiInstance.getAccountInfo);

module.exports = router
