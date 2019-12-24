module.exports = function(sequelize, Sequelize) {
    const Model = Sequelize.Model;
    class Account extends Model {}

  Account.init({
        id: {
            type: Sequelize.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        password: {
            type: Sequelize.STRING(64),
            allowNull: false,
            defaultValue: ''
        },
        username: {
            type: Sequelize.STRING(64),
            allowNull: false,
            defaultValue: ''
        },
        phone: {
            type: Sequelize.STRING(16),
            allowNull: false,
            defaultValue: ''
        },
        email: {
            type: Sequelize.STRING(64),
            allowNull: false,
            defaultValue: ''
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
        tableName: 'tb_account'
    })
    return Account
};
