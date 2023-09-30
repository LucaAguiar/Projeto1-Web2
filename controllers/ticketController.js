const db = require("../config");

module.exports = {
  async postCreate(req, res) {
    const { title, description, category_id, user_id, technician_id } =
      req.body;
    db.Ticket.create({
      title,
      description,
      category_id,
      user_id,
      technician_id,
    })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  async getAll(req, res) {
    const l = await db.Ticket.findAll();
    res.status(200).json(l);
  },

  async delete(req, res) {
    const { id } = req.body;
    db.Ticket.destroy({ where: { id: id } })
      .then((e) => res.status(200).json({}))
      .catch((err) => res.status(500).json(err));
  },
};
