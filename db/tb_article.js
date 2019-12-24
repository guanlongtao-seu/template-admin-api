module.exports = function(sequelize, Sequelize) {
  const Model = Sequelize.Model;
  class Article extends Model {}

  Article.init({
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    },
    author_id: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    is_audited: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
    tableName: 'tb_article'
  });
  return Article
};
