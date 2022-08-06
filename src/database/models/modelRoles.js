const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Role = sequelize.define('Role', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleAcess: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const init = (async () => {
    await Role.sync();
})();

module.exports = Role;