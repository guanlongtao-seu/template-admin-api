const { TBImage } = require('../db/table');
const BaseService = require('../service/BaseService');
const baseArticleService = new BaseService(Image);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 获取文章列表
exports.list = async function(ctx) {
  let {filter, current, pageSize} = ctx.request.query;
  let {id, remark} = JSON.parse(filter);
  let where = {};
  pageSize = parseInt(pageSize);
  current = parseInt(current);
  if (!isNaN(parseInt(id))) {
    where['id'] = id;
  }
  if (title) {
    where['remark'] = {
      [Op.like]: `%${remark}%`
    }
  }
  const {tableData, total} = await baseArticleService.findAllAndCount({
    current,
    pageSize,
    where,
    order: [['id', 'DESC']]
  });
  ctx.body = {
    errorCode: 0,
    message: '',
    data: {
      tableData,
      current,
      pageSize,
      total
    }
  }
};
