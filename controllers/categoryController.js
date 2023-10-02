const db = require("../config");

module.exports = {
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

    async getAll(req, res) {
        db.Category.findAll()
            .then((categories) => {
                res.render("categoryViews/categoryListView", {
                    categories: categories.map((category) => category.toJSON()),
                });
            })
            .catch((error) => console.log(error));
    },

    async delete(req, res) {
        const { id } = req.body;
        db.Category.destroy({ where: { id: id } })
            .then((e) => res.status(200).json({}))
            .catch((err) => res.status(500).json(err));
    },
};
