const express = require('express');
const routes = express.Router();
const User = require('../models/users');
const crypto = require('crypto');


routes.get('/', async (req, res, next) => {
    const registeredTasks = await User.find({ deleted: false });
    res.json(registeredTasks);
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
    const registro = await User.findOne({ email: body.email, senha: body.senha});

    if (registro) {
        res.json({status: true, message: "Logado com sucesso"})
    } else {
        res.json({status: false, message: "Algo deu errado"})
    }
});

routes.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    await User.updateOne({ _id: id }, body);
    res.json({ status: true, message: 'OK' })

});

module.exports = routes;
