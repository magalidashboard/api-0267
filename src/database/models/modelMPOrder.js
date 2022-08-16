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
    transaction_amount: 'hash',
    purchase_order: 'po_value',
    date_approved: 'datestring',
    first_six_digits: 'XXXXXX',
    last_four_digits: 'XXXX',
    display_name: 'Marilu do trovao',
    email: 'maryofthunder@gmail.com'
*/

const mpOrder = sequelize.define('mpOrder', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    transaction_amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    purchase_order: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_approved: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    first_six_digits: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_four_digits:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    display_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const init = (async () => {
    await mpOrder.sync();
})();

module.exports = mpOrder;