const express = require("express");
const db = require("../config");
const userController = require("../controllers/userController");
const ticketController = require("../controllers/ticketController");
const categoryController = require("../controllers/categoryController");
const route = express.Router();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("{ force: true }");
// });
/*db.User.create({
    login: "admin",
    password: "1234",
    name: "admin",
    type: "admin",
});*/

//Home
/*route.get("/home", function (req, res) {
    //if (req.cookies.userData) {
    if (req.session.login) {
        res.render("home");
    } else res.redirect("/");
});*/

route.get("/", userController.getLogin);
route.post("/login", userController.postLogin);
route.get("/logout", userController.getLogout);
route.post("/ticket/insert", ticketController.postCreate);
route.post("/user/insert", userController.postCreate);
route.post("/category/insert", categoryController.postCreate);

module.exports = route;
