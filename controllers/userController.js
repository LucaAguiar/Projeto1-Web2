const db = require("../config");
const path = require("path");

module.exports = {
  async getLogin(req, res) {
    res.render("userViews/loginView", { layout: "noMenu.handlebars" });
  },
  async getLogout(req, res) {
    req.session.destroy();
    res.redirect("/");
  },
  async postLogin(req, res) {
    var user = {
      login: req.body.login,
    };
    db.User.findAll({
      where: { login: req.body.login, password: req.body.password },
    })
      .then((users) => {
        if (users.length > 0) {
          req.session.login = req.body.login;
          res.render("home");
        } else res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async postCreate(req, res) {
    const { login, password, name, type } = req.body;
    db.User.create({ login, password, name, type })
      .then((e) => {
        res.status(200).json(e);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
