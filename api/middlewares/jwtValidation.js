const routes = require('express').Router();
const jwt = require('./../services/jwt')

routes.use((req, res, next) => {
    if (jwt.validate(req)) {
        next();
    } else {
        res.status(403).json({ status: false, message: "Usuario nao autenticado" });
    }
})

module.exports = routes;

