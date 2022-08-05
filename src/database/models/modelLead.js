const { DATE } = require('sequelize');
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
    cpf: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cnpj: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cep: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    complement_address: {
        type: DataTypes.STRING(1000),
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
    documents:  {
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    galery_store: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    store_address: {
        type: DataTypes.STRING,
        allowNull: false
    },

});

const init = (async () => {
    await Lead.sync();
})();

module.exports = Lead;