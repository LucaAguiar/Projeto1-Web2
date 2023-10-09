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

    async getTicketCreate(req, res) {
        db.Category.findAll().then((cat) => {
            res.render("ticketViews/ticketCreateView", {
                categories: cat.map((c) => c.toJSON()),
            });
        });
    },

    async postTicketCreate(req, res) {
        const { title, description, category_id, user_id } = req.body;
        db.Ticket.create({
            title,
            description,
            category_id,
            user_id,
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
        const tecnicos = await db.User.findAll();
        await db.Ticket.findByPk(req.params.id)
            .then((ticket) =>
                res.render("ticketViews/ticketUpdateView", {
                    ticket: ticket.dataValues,
                    tecs: tecnicos
                        .filter((e) => e.dataValues.type == "tec")
                        .map((e) => e.dataValues),
                })
            )
            .catch(function (err) {
                console.log(err);
            });
    },

    async postTicketUpdate(req, res) {
        const {
            id,
            title,
            description,
            category_id,
            observation,
            status,
            technician_id,
        } = req.body;
        console.log("id: ", id);
        await db.Ticket.update(
            {
                id,
                title,
                description,
                category_id,
                observation,
                status,
                technician_id,
            },
            { where: { id: id } }
        )
            .then(res.render("userViews/homeView"))
            .catch(function (err) {
                console.log(err);
            });
    },

    async getTicketDelete(req, res) {
        db.Ticket.destroy({ where: { id: req.params.id } })
            .then((e) => res.render("userViews/homeView"))
            .catch((err) => res.status(500).json(err));
    },
};
