const db = require("../config");

module.exports = {
  async postCreate(req, res) {
    const { title, description, category_id } = req.body;
    db.Ticket.create({
      title,
      description,
      category_id,
      user_id: 1,
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

  async getTicketCreate(req, res) {
    const cats = db.Category.findAll().then((cat) => {
      res.render("ticketViews/ticketCreateView", {
        categories: cat.map((c) => c.toJSON()),
      });
    });
  },
};
