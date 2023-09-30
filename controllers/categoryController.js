const db = require("../config");

module.exports = {
  async postCreate(req, res) {
    const { name } = req.body;
    db.Category.create({ name })
      .then((e) => res.status(200).json(e))
      .catch((err) => res.status(500).json(err));
  },

  async getAll(req, res) {
    const l = await db.Category.findAll();
    res.status(200).json(l);
  },

  async delete(req, res) {
    const { id } = req.body;
    db.Category.destroy({ where: { id: id } })
      .then((e) => res.status(200).json({}))
      .catch((err) => res.status(500).json(err));
  },
};
