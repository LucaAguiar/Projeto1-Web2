const Sequelize = require("sequelize");
const sequelize = new Sequelize("projeto1_db", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("../models/user.js")(sequelize, Sequelize);
db.Ticket = require("../models/ticket.js")(sequelize, Sequelize);
db.Category = require("../models/category.js")(sequelize, Sequelize);

db.Category.hasMany(db.Ticket, {
    foreignKey: "category_id",
    onDelete: "NO ACTION",
});
db.User.hasMany(db.Ticket, {
    foreignKey: "user_id",
    onDelete: "NO ACTION",
});
db.User.hasMany(db.Ticket, {
    foreignKey: "technician_id",
    onDelete: "NO ACTION",
});

module.exports = db;
