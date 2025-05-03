require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log('Password recibida:', typeof process.env.DB_PASSWORD, process.env.DB_PASSWORD);
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    }
);

module.exports = sequelize;