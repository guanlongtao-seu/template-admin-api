const { HttpException } = require('../core/http-exception')
const errorInfo = require('../constant/errorInfo')
const Moment = require('moment')
const Sequelize = require('sequelize')

const handleApiError = async (ctx, next) => {
    const now = Moment().format('YYYY-MM-DD HH:mm:ss')
    try {
        await next();
    } catch (err) {
        console.log(now, err)
        if (err instanceof HttpException) {
            ctx.body = {
                error_code: err.errorCode,
                message: err.message,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = err.code
        } else if (err instanceof Sequelize.Error){
            Object.assign(ctx.body, errorInfo.DBError)
            ctx.body.request = `${ctx.method} ${ctx.path}`
            ctx.status = 500
        } else {
            Object.assign(ctx.body, errorInfo.UnknownError)
            ctx.body.request = `${ctx.method} ${ctx.path}`
            ctx.status = 500
        }
    }
}

module.exports = handleApiError