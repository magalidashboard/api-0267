const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Areas = sequelize.define('Areas', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    areaType:{
        type: DataTypes.STRING,
        allowNull: false
    },
    areaChoose: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    areaDoc: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const init = (async () => {
    await Areas.sync();
})();

module.exports = Areas;