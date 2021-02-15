const express = require('express');
const routes = express.Router();
const Task = require('../../models/task-model');

routes.get('/', async (req, res, next) => {
    const registeredTasks = await Task.find({deleted: false});
    res.json(registeredTasks);
});

routes.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const registeredTask = await Task.findById(id);
    res.json(registeredTask);
});

routes.post('/', async (req, res, next) => {
    const body = req.body;
    if (body.description && body.description.length > 0) {
        const register = await Task.create(body);

        res.json({ status: true, message: "OK", register });
    } else {
        res.json({ status: false, message: "Descricao eh obrigatoria" });
    }
});

routes.get('/complete/:id', async (req, res, next) => {
    const id = req.params.id;
    const objTaks = await Task.findById(id);
    objTaks.state = !objTaks.state;
    await objTaks.save();
    const registers = await Task.find({deleted: false});
    res.json(registers);
});

// routes.delete('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         await Task.deleteOne({ _id: id });
//         res.json({ status: true, message: "Excluido com sucesso" });
//     } catch (e) {
//         res.json({ status: false, message: e.message })
//     }

// });

routes.put('/:id', async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    if (body.description && body.description.length > 0) {
        await Task.updateOne({ _id: id }, body);
        res.json({ status: true, message: 'OK' })
    } else {
        res.json({ status: false, message: 'Erro ao atualizar' })
    }
});

module.exports = routes;
