const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const { sequelize, User } = require('./models');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const clientRoutes = require('./routes/clientRoutes');
const cartRoutes = require("./routes/cartRoutes");



const app = express();
app.use(cors());
app.use(bodyParser.json());

// panel admin
app.use(express.static('public'));

app.use('/admin', express.static('public/admin'));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use("/api/cart", cartRoutes);


(async () => {
  await sequelize.sync({ alter: true });

  // crear usuario admin si no existe
  if (await User.count() === 0) {
    await User.create({ username: 'admin', password: 'admin123', role: 'admin' });
    console.log("Usuario admin creado: admin / admin123");
  }
})();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en puerto " + PORT));

