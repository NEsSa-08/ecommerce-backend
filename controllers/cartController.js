const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

// Obtener clientId del header
function getClientId(req) {
  return req.headers["x-client-id"];
}

exports.addToCart = async (req, res) => {
  const clientId = getClientId(req);
  const { productId, quantity } = req.body;

  if (!clientId)
    return res.status(400).json({ msg: "Falta clientId" });

  // 1. Obtener o crear carrito
  let cart = await Cart.findOne({ where: { clientId } });
  if (!cart) cart = await Cart.create({ clientId });

  // 2. Validar producto
  const product = await Product.findByPk(productId);
  if (!product) return res.status(404).json({ msg: "Producto no encontrado" });

  // 3. Buscar item en el carrito
  let item = await CartItem.findOne({
    where: { cartId: cart.id, productId }
  });

  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    item = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity
    });
  }

  res.json({ msg: "Producto agregado", item });
};

exports.getCart = async (req, res) => {
  const clientId = getClientId(req);

  const cart = await Cart.findOne({
    where: { clientId },
    include: [
      {
        model: CartItem,
        include: [Product]
      }
    ]
  });

  res.json(cart || { items: [] });
};

exports.checkout = async (req, res) => {
  const clientId = getClientId(req);

  const cart = await Cart.findOne({
    where: { clientId },
    include: [
      {
        model: CartItem,
        include: [Product]
      }
    ]
  });

  if (!cart || cart.CartItems.length === 0)
    return res.status(400).json({ msg: "Carrito vacío" });

  let total = 0;

  for (const item of cart.CartItems) {
    if (item.quantity > item.Product.stock)
      return res.status(400).json({ msg: `Stock insuficiente para ${item.Product.name}` });

    total += item.quantity * item.Product.price;
  }

  // Crear orden
  const order = await Order.create({ clientId, total });


  for (const item of cart.CartItems) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.Product.price
    });

    // Descontar stock
    await Product.update(
      { stock: item.Product.stock - item.quantity },
      { where: { id: item.productId } }
    );
  }

  // Limpiar carrito
  await CartItem.destroy({ where: { cartId: cart.id } });

  res.json({ msg: "Compra realizada", orderId: order.id, total });
};
