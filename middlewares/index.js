module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + req.method + new Date());
        next();
    },
    sessionControl(req, res, next) {
        if (req.session.login != undefined) {
            res.locals.userId = req.session.userId;
            if (req.session.type === "admin") {
                res.locals.admin = true;
                res.locals.tec = true;
                res.locals.user = true;
            } else if (req.session.type === "tec") {
                res.locals.tec = true;
            } else res.locals.user = true;

            next();
        } else if (req.url == "/" && req.method == "GET") next();
        else if (req.url == "/login" && req.method == "POST") next();
        else if (req.url == "/userCreate" && req.method == "GET") next();
        else if (req.url == "/userCreate" && req.method == "POST") next();
        else res.redirect("/");
    },
};
