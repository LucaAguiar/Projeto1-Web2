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

// User:
route.get("/", userController.getLogin);
route.post("/login", userController.postLogin);
route.get("/logout", userController.getLogout);
route.get("/getUsers", userController.getAll);
route.get("/userCreate", userController.getUserCreate);
route.post("/userCreate", userController.postUserCreate);
route.get("/userUpdate/:id", userController.getUserUpdate);
route.post("/userUpdate", userController.postUserUpdate);
route.get("/userDelete/:id", userController.getUserDelete);

// Ticket
route.post("/ticket/insert", ticketController.postCreate);
route.get("/ticket/get-all", ticketController.getAll);
route.delete("/ticket/delete", ticketController.delete);

// Category
route.post("/category/insert", categoryController.postCreate);
route.get("/category/get-all", categoryController.getAll);
route.delete("/category/delete", categoryController.delete);

module.exports = route;
