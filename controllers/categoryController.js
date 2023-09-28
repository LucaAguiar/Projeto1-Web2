const db = require("../config");

module.exports = {
  async postCreate(req, res) {
    const { name } = req.body;
    db.Category.create({ name })
      .then((e) => res.status(200).json(e))
      .catch((err) => res.status(500).json(err));
  },
};
