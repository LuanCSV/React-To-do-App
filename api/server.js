const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/task-model');

mongoose.connect('mongodb+srv://todoUser:todoUser@mean-course.ocusw.mongodb.net/To-do-ReactDB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB conectado');
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Mensagem" })
});

app.get('/tasks', async (req, res, next) => {
    const Task = require('./models/task-model');

    const registeredTasks = await Task.find();
    res.json(registeredTasks);
});

app.post('/tasks', async (req, res, next) => {
    const body = req.body;
    if (body.description && body.description.length > 0) {
        const Task = require('./models/task-model');
        await Task.create(body);

        const registeredTasks = await Task.find();
        res.json(registeredTasks);
    } else {
        res.json({ erro: "Descricao eh obrigatoria" })
    }
});

app.get('/tasks/complete/:id', async (req, res, next) => {
    const Task = require('./models/task-model');
    const id = req.params.id;
    const objTaks = await Task.findById(id);
    objTaks.state = !objTaks.state;
    await objTaks.save();
    const registers = await Task.find();
    res.json(registers);
});

app.delete('/tasks/delete/:id', async (req, res) => {
    const Task = require('./models/task-model');
    const id = req.params.id;
    await Task.deleteOne({ _id: id });
    
    const registers = await Task.find();
    res.json(registers);
})



app.listen(5050, () => {
    console.log('Iniciando servidor');
});
