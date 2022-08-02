const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ReducedLead = sequelize.define('ReducedLead', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    birthDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    regDoc:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    areaChooseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    documents:  {
        type: DataTypes.STRING(10000),
        allowNull: false,
    },
    hasBusiness: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    terms: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const init = (async () => {
    await ReducedLead.sync();
})();

module.exports = ReducedLead;