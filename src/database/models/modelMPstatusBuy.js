const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

/*
    //TITLE MODEL
    "id": NUMBER,
    "location": STRING,
    "title": STRING,
    "language": STRING
*/

/*
    //EXAMPLE USAGE
    store: 'hash',
    public_key: 'MP_PUBLIC'
*/

const statusBuy = sequelize.define('statusBuy', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    buyid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const init = (async () => {
    await statusBuy.sync();
})();

module.exports = statusBuy;