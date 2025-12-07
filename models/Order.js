const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  clientId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

module.exports = Order;

