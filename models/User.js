const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static initModel(sequelize) {
    User.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: 'admin' }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true
    });

    User.beforeCreate(async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    });

    return User;
  }

  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
