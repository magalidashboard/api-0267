const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Lead = sequelize.define('Lead', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completeAddress: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    maritalStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    childrens: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    documents:  {
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    areaChooseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hasBusiness: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    terms: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    regDoc: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const init = (async () => {
    await Lead.sync();
})();

module.exports = Lead;