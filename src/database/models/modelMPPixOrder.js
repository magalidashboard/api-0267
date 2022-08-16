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

const mpOrderPix = sequelize.define('mpOrderPix', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    purchase_order:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    net_received_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    transaction_amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    overpaid_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    installment_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    qr_code_base64:{
        type: DataTypes.STRING(10000),
        allowNull:false,
    },
    qr_code:{
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const init = (async () => {
    await mpOrderPix.sync();
})();

module.exports = mpOrderPix;