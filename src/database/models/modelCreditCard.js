const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const PaymentCredit = sequelize.define('PaymentCredit', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
});

const init = (async () => {
    await PaymentCredit.sync();
})();

module.exports = PaymentCredit;