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
        allowNull: false,
        unique: true
    },
    roleAcess: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const init = (async () => {
    await Role.sync();
})();

module.exports = Role;