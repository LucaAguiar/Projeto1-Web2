const db = require("../config");

module.exports = {
    async getAll(req, res) {
        db.Ticket.findAll()
            .then((tickets) => {
                res.render("ticketViews/ticketsListView", {
                    tickets: tickets.map((ticket) => ticket.toJSON()),
                });
            })
            .catch((error) => console.log(error));
    },

    async delete(req, res) {
        const { id } = req.body;
        db.Ticket.destroy({ where: { id: id } })
            .then((e) => res.status(200).json({}))
            .catch((err) => res.status(500).json(err));
    },

    async getTicketCreate(req, res) {
        db.Category.findAll().then((cat) => {
            res.render("ticketViews/ticketCreateView", {
                categories: cat.map((c) => c.toJSON()),
            });
        });
    },

    async postTicketCreate(req, res) {
        const { title, description, category_id } = req.body;
        db.Ticket.create({
            title,
            description,
            category_id,
            user_id: 1,
            status: "Não resolvido",
        })
            .then(() => {
                res.render("userViews/homeView");
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    async getTicketUpdate(req, res) {
        await db.User.findByPk(req.params.id)
            .then((ticket) =>
                res.render("ticketViews/ticketUpdateView", {
                    ticket: ticket.dataValues,
                })
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    async postTicketUpdate(req, res) {
        await db.Ticket.update(req.body, { where: { id: req.body.id } })
            .then(res.render("userViews/homeView"))
            .catch(function (err) {
                console.log(err);
            });
    },
};
