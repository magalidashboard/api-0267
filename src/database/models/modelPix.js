const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PaymentPix = sequelize.define('PaymentPix', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
});

const init = (async () => {
    await PaymentPix.sync();
})();

module.exports = PaymentPix;