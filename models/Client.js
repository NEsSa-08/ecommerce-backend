const { DataTypes, Model } = require('sequelize');

class Client extends Model {
  static initModel(sequelize) {
    Client.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true },
      phone: { type: DataTypes.STRING }
    }, {
      sequelize,
      modelName: 'Client',
      tableName: 'clients',
      timestamps: true
    });

    return Client;
  }
}

module.exports = Client;

