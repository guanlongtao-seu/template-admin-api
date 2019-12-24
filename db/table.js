const Sequelize = require('sequelize')
const { dbTemplate } = require('../config/dev')

const dbTemplateInstance = new Sequelize(dbTemplate, {
    /**
     * 传递连接 URI
     * 'mysql://user:pass@example.com:9821/dbname'
     */
    timezone: '+08:00', // 东八时区
    logging: console.log,
    pool: {
        max: 1000,
        min: 0
    },
    define: {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
// 测试连接代码
// dbMay.authenticate()
//  .then(() => {
//      console.log('连接成功')
//   })
//   .catch(err => {
//       console.error(err)
//   })

exports.dbTemplateInstance = dbTemplateInstance;

// 导出表模型
// 用户表
exports.TBAccount = require('./tb_account')(dbTemplateInstance, Sequelize);

// 文章
exports.TBArticle = require('./tb_article')(dbTemplateInstance, Sequelize);
// 图片
exports.TBImage = require('./tb_image')(dbTemplateInstance, Sequelize);
