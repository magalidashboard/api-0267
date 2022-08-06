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
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true,
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
    address: {
        type: DataTypes.STRING(10000),
        allowNull: false,
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
    }
});

const init = (async () => {
    await Lead.sync();
})();

module.exports = Lead;