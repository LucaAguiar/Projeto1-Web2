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
};
