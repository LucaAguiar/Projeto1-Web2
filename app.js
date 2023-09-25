const routes = require("./router");
const handlebars = require("express-handlebars");
const express = require("express");
var session = require("express-session");
const app = express();
app.use(
    session({ secret: "textosecreto", cookie: { maxAge: 30 * 60 * 1000 } })
);

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.listen(8081, function () {
    console.log("Servidor no http://localhost:8081");
});
