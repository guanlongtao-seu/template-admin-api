const requireDirectory = require('require-directory') // 加载目录
const Router = require('koa-router')

class InitManager {
    // 初始化入口方法
    static initCore(app) {
        InitManager.app = app
        InitManager.initRouters()
    }
    // 初始化路由
    static initRouters() {
        // process.cwd()根目录路径
        const routerDirectory = `${process.cwd()}/routes`
        requireDirectory(module, routerDirectory, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
}

module.exports = InitManager
