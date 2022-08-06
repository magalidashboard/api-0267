const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Faq = sequelize.define('Faq', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const init = (async () => {
    await Faq.sync();
})();

module.exports = Faq;