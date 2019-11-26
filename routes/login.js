const Router = require('koa-router')
const router = new Router()
const apiInstance = require('../api/login')
router.prefix('/api')

router.post('/login', apiInstance.login);
router.get('/getVerificationCode', apiInstance.getVerificationCode);
router.post('/verificationCodeLogin', apiInstance.verificationCodeLogin);

module.exports = router
