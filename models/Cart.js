
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Cart = sequelize.define("Cart", {
  clientId: {
    type: DataTypes.STRING,   // 🔥 antes era INTEGER
    allowNull: false
  }
});

module.exports = Cart;


