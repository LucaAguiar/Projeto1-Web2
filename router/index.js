const express = require("express");
const db = require("../config");
const userController = require("../controllers/userController");
const route = express.Router();

db.sequelize.sync({ force: true }).then(() => {
    console.log("{ force: true }");
});
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

module.exports = route;
