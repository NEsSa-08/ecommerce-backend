const sequelize = require('../config/db');

const User = require('./user');
const Category = require('./Category');
const Product = require('./Product');
const Client = require('./Client');

const models = {};

models.User = User.initModel(sequelize);
models.Category = Category.initModel(sequelize);
models.Product = Product.initModel(sequelize);
models.Client = Client.initModel(sequelize);

// Relaciones
models.Category.hasMany(models.Product, { foreignKey: 'categoryId' });
models.Product.belongsTo(models.Category, { foreignKey: 'categoryId' });

module.exports = { sequelize, ...models };

