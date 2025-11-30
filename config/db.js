// config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'proyecto',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql', // 'postgres' o 'sqlite'
    logging: false,
    storage: process.env.DB_STORAGE || './database.sqlite' // si sqlite
  }
);

module.exports = sequelize;
