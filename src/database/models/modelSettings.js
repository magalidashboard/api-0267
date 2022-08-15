const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Settings = sequelize.define('Settings', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    mercado_pago_store: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mercado_pago_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mercado_pago_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mercado_pago_url_success: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mercado_pago_url_pending: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mercado_pago_url_failure: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mercado_pago_notification_url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pagseguro_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pagseguro_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pagseguro_public_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull:false,
        unique: true
    },
    whatsapp_message: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
    }
});

const init = (async () => {
    await Settings.sync();
})();

module.exports = Settings;