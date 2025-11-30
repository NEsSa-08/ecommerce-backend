const { DataTypes, Model } = require('sequelize');

class Product extends Model {
  static initModel(sequelize) {
    Product.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
      stock: { type: DataTypes.INTEGER, defaultValue: 0 },
      categoryId: { type: DataTypes.INTEGER }
    }, {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
      timestamps: true
    });

    return Product;
  }
}

module.exports = Product;


