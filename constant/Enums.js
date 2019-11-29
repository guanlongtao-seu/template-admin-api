/**
 * 数据状态
 */
const DataStatus = exports.DataStatus = {
  Enabled : 1, // 启用中
  Disabled: 0, // 禁用中
};

exports.DataStatusName = {
  [DataStatus.Disabled]: '禁用中',
  [DataStatus.Enabled] : '启用中'
};
