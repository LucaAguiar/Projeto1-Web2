const db = require("../config");

module.exports = {
    async getAll(req, res) {
        db.Category.findAll()
            .then((categories) => {
                res.render("categoryViews/categoryListView", {
                    categories: categories.map((category) => category.toJSON()),
                });
            })
            .catch((error) => console.log(error));
    },

    async getCategoryCreate(req, res) {
        res.render("categoryViews/categoryCreateView");
    },

    async postCategoryCreate(req, res) {
        db.Category.create(req.body)
            .then(() => {
                res.render("userViews/homeView");
            })
            .catch((err) => {
                console.log(err);
            });
    },

    async getCategoryUpdate(req, res) {
        await db.Category.findByPk(req.params.id)
            .then((category) => {
                res.render("categoryViews/categoryUpdateView", {
                    category: category.dataValues,
                });
            })
            .catch((error) => console.log(error));
    },

    async postCategoryUpdate(req, res) {
        await db.Category.update(req.body, { where: { id: req.body.id } })
            .then(res.render("userViews/homeView"))
            .catch(function (err) {
                console.log(err);
            });
    },

    async getCategoryDelete(req, res) {
        db.Category.destroy({ where: { id: req.params.id } })
            .then((e) => res.render("userViews/homeView"))
            .catch((err) => res.status(500).json(err));
    },
};
