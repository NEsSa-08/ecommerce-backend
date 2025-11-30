const { Client } = require('../models');

exports.create = async (req, res) => {
  try {
    const data = await Client.create(req.body);
    res.status(201).json(data);
  } catch (e) { res.status(400).json({ error: e.message }); }
};

exports.list = async (_, res) => {
  res.json(await Client.findAll());
};

exports.get = async (req, res) => {
  const data = await Client.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "No encontrado" });
  res.json(data);
};

exports.update = async (req, res) => {
  const data = await Client.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "No encontrado" });
  await data.update(req.body);
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await Client.findByPk(req.params.id);
  if (!data) return res.status(404).json({ message: "No encontrado" });
  await data.destroy();
  res.json({ message: "Eliminado" });
};

