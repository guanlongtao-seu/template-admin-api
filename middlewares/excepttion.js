const { HttpException } = require('../core/http-exception');
const ErrorInfo = require('../constant/ErrorInfo');
const Moment = require('moment');
const Sequelize = require('sequelize');

const handleApiError = async (ctx, next) => {
    const now = Moment().format('YYYY-MM-DD HH:mm:ss');
    try {
        await next();
    } catch (err) {
        console.log(now, err);
        if (err instanceof HttpException) {
            ctx.body = {
                errorCode: err.errorCode,
                message: err.message,
                request: `${ctx.method} ${ctx.path}`
            };
            ctx.status = err.code
        } else if (err instanceof Sequelize.Error){
            Object.assign(ctx.body, ErrorInfo.DBError);
            ctx.body.request = `${ctx.method} ${ctx.path}`;
            ctx.status = 500
        } else {
            Object.assign(ctx.body, ErrorInfo.UnknownError);
            ctx.body.request = `${ctx.method} ${ctx.path}`;
            ctx.status = 500
        }
    }
};

module.exports = handleApiError
