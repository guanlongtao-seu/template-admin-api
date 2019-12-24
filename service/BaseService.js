const { DataStatus } = require('../constant/Enums');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * 封装基本的数据库查询操作
 */
class BaseService {
  constructor(table) {
    this.table = table;
  }

  /**
   * 根据ID查找单条记录
   *
   * @param id
   * @param force
   * @returns {Promise<Model>}
   */
  async findItemById(id, force = 0) {
    let where = {};
    force === 1 ? where = { id } : where = {
      id,
      status: DataStatus.Enabled
    };
    return await this.table.findOne({
      raw: true,
      where
    })
  }

  /**
   * 根据ID批量查询
   *
   * @param ids
   * @param force
   * @returns {Promise<Model[]>}
   */
  async batchFindItemsByIds(ids, force = 0) {
    let where = {};
    force === 1 ? where = {
      id: {
        [Op.in]: ids
      }
    } : where = {
      id: {
        [Op.in]: ids
      },
      status: DataStatus.Enabled
    };
    return await this.table.findAll({
      raw: true,
      where
    })
  }

  /**
   *
   * @param where
   * @returns {Promise<Model>}
   */
  async findItemByFilter(filter) {
    return await this.table.findOne({
      raw: true,
      where: filter
    })
  }

  /**
   *
   * @param current
   * @param pageSize
   * @param where
   * @param order
   * @param include
   * @returns {Promise<{tableData, total: number}>}
   */
  async findAllAndCount({ current = 1, pageSize = 20, where, order, include }) {
    const offset = (current > 1 ? current - 1 : 0) * pageSize;
    const condition = {
      raw: true,
      offset,
      limit: pageSize,
      order,
      where
    };
    if (include) {
      condition.include = include;
      condition.distinct = true;
    }
    const { rows, count } = await this.table.findAndCountAll(condition);
    return {
      tableData: rows,
      total: count
    }
  }
}

module.exports = BaseService;
