const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('agrifarm', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log('Database connected'), // Optional: log SQL queries
});

module.exports = sequelize;
