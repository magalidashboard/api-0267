const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Settings = sequelize.define('Settings', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    mercado_pago: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pagseguro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    whatsapp_message: {
        type: DataTypes.STRING, 
        allowNull: false
    }
});

const init = (async () => {
    await Settings.sync();
})();

module.exports = Settings;