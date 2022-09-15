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
    rg:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    cep_store: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
    store_address: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
    documents:  {
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    galery_store: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payments_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    current_payment: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    whatsapp_status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    customer_id:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

const init = (async () => {
    await Lead.sync();
})();

module.exports = Lead;