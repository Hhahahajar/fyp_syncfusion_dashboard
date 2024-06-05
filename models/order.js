const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Order;
