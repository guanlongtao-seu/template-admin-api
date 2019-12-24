module.exports = function(sequelize, Sequelize) {
  const Model = Sequelize.Model;
  class Image extends Model {}

  Image.init({
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: Sequelize.STRING(128),
      allowNull: false,
      defaultValue: ''
    },
    priority: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    remark: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    created_at: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    updated_at: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    sequelize,
    tableName: 'tb_image'
  });
  return Image
};
