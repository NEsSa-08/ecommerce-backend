const { DataTypes, Model } = require('sequelize');

class Category extends Model {
  static initModel(sequelize) {
    Category.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT }
    }, {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: true
    });

    return Category;
  }
}

module.exports = Category;
