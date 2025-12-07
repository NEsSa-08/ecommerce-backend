const sequelize = require('../config/db');

// Importar modelos EN ORDEN
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Client = require('./Client');
const Cart = require('./Cart');
const CartItem = require('./CartItem'); 
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Inicializar modelos (si usan initModel)
const models = {};

models.User = User.initModel(sequelize);
models.Category = Category.initModel(sequelize);
models.Product = Product.initModel(sequelize);
models.Client = Client.initModel(sequelize);

// Si Cart, CartItem, Order, OrderItem NO usan initModel, solo los exportamos:
models.Cart = Cart;
models.CartItem = CartItem;
models.Order = Order;
models.OrderItem = OrderItem;

/* ============================
      RELACIONES
============================ */

// Categorías → Productos
models.Category.hasMany(models.Product, { foreignKey: "categoryId" });
models.Product.belongsTo(models.Category, { foreignKey: "categoryId" });

// Carrito → Items del carrito
models.Cart.hasMany(models.CartItem, { foreignKey: "cartId" });
models.CartItem.belongsTo(models.Cart, { foreignKey: "cartId" });

// Producto → Items del carrito
models.Product.hasMany(models.CartItem, { foreignKey: "productId" });
models.CartItem.belongsTo(models.Product, { foreignKey: "productId" });




// Orden → Items
models.Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
models.OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });

// Orden → Usuario
models.Order.belongsTo(models.User, { foreignKey: "userId" });

// Producto → Items de orden
models.Product.hasMany(models.OrderItem, { foreignKey: "productId" });
models.OrderItem.belongsTo(models.Product, { foreignKey: "productId" });

module.exports = { sequelize, ...models };


