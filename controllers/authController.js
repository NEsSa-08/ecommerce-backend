const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const ok = await user.validatePassword(password);
  if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

  const payload = { id: user.id, username: user.username, role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

  res.json({ token, user: payload });
};
