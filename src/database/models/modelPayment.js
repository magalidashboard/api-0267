const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Payment = sequelize.define('Payment', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    extract_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_detail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tax: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    professional_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link_payment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const init = (async () => {
    await Payment.sync();
})();

module.exports = Payment;