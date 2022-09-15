const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Profession = sequelize.define('Profession', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cellphone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    documents: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const init = (async () => {
    await Profession.sync();
})();

module.exports = Profession;