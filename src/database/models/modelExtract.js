const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Extract = sequelize.define('Extract', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    extract_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_link: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const init = (async () => {
    await Extract.sync();
})();

module.exports = Extract;