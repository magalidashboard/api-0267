const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const UserAdmMultipli = sequelize.define('UserAdmMultipli', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    }
});

const init = (async () => {
    await UserAdmMultipli.sync();
})();

module.exports = UserAdmMultipli;