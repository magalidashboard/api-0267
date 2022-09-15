const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Settings = sequelize.define('Settings', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    asaas_api: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    expire_day: {
        type: DataTypes.INTEGER,
        allowNull:false,
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