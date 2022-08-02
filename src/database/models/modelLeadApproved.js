const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const LeadStatus = sequelize.define('LeadStatus', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    hasApproved: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const init = (async () => {
    await LeadStatus.sync();
})();

module.exports = LeadStatus;