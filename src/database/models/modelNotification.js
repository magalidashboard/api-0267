const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Notification = sequelize.define('Notification', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    notification: {
        type: DataTypes.STRING(100000),
        allowNull: false,
    }
});

const init = (async () => {
    await Notification.sync();
})();

module.exports = Notification;