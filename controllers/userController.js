const { error } = require("console");
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
        db.User.findAll({
            where: { login: req.body.login, password: req.body.password },
        })
            .then((users) => {
                if (users.length > 0) {
                    req.session.login = req.body.login;
                    res.render("userViews/homeView");
                } else res.redirect("/");
            })
            .catch((err) => {
                console.log(err);
            });
    },

    async getAll(req, res) {
        db.User.findAll()
            .then((users) => {
                res.render("userViews/usersListView", {
                    users: users.map((user) => user.toJSON()),
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },

    async getUserCreate(req, res) {
        res.render("userViews/userCreateView", { layout: "noMenu.handlebars" });
    },

    async postUserCreate(req, res) {
        db.User.create(req.body)
            .then(() => {
                res.render("userViews/homeView");
            })
            .catch((error) => console.log(error));
    },

    async getUserUpdate(req, res) {
        await db.User.findByPk(req.params.id)
            .then((user) =>
                res.render("userViews/userUpdateView", {
                    user: user.dataValues,
                })
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    async postUserUpdate(req, res) {
        await db.User.update(req.body, { where: { id: req.body.id } })
            .then(res.render("userViews/homeView"))
            .catch(function (err) {
                console.log(err);
            });
    },

    async getUserDelete(req, res) {
        db.User.destroy({ where: { id: req.params.id } })
            .then((e) => res.render("userViews/homeView"))
            .catch((err) => res.status(500).json(err));
    },
};
