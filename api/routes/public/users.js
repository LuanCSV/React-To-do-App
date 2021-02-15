const express = require('express');
const routes = express.Router();
const crypto = require('crypto');
// const jwt = require('../services/jwt');
const User = require('../../models/users');

routes.get('/', async (req, res, next) => {
    // if (jwt.validate(req)) {
        const registeredTasks = await User.find({ deleted: false });
        res.json(registeredTasks);
    // } else {
        // res.status(403).json({status: false, message: 'Usuario nao autenticado'});
    // }
});

routes.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const registeredTask = await User.findById(id);
    res.json(registeredTask);
});

routes.post('/', async (req, res, next) => {
    const body = req.body;
    const senhaCriptografada = crypto.createHash("sha1").update(body.senha).digest('hex');
    body.senha = senhaCriptografada;
    const registro = await User.create(body);
    res.json({ status: true, message: "Criado com sucesso", registro })
});

routes.post('/auth', async (req, res, next) => {
    const body = req.body;
    const senhaCriptografada = crypto.createHash("sha1").update(body.senha).digest('hex');
    body.senha = senhaCriptografada;
    const registro = await User.findOne({ email: body.email, senha: body.senha });

    if (registro) {
        const payload = {
            id: registro._id,
            nome: registro.nome,
            email: registro.email,
        }
        const token = jwt.sign(payload);
        res.json({ status: true, message: "Logado com sucesso", token })
    } else {
        res.json({ status: false, message: "Usuario nao encontrado ou senha incorreta" })
    }
});

// routes.get("/token/verifica-jwt", (req, res, next) => {
//     const decoded = jwt.validate(req);
//     res.json(decoded);
// });

routes.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    await User.updateOne({ _id: id }, body);
    res.json({ status: true, message: 'OK' })

});

module.exports = routes;
