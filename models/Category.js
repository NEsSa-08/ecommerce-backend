const { DataTypes, Model } = require("sequelize");

class Category extends Model {
  static initModel(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        modelName: "Category",
        tableName: "categories"
      }
    );
  }
}

module.exports = Category;
