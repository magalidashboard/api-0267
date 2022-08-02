const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE_URL,
    {
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            }
        }
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Connected'))
    .catch(err => console.log('Unable to connect', err));

module.exports = sequelize;