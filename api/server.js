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

app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "Mensagem" })
});

app.get('/tasks', async (req, res, next) => {
    const Task = require('./models/task-model');

    const registeredTasks = await Task.find();
    res.json(registeredTasks);
});

app.listen(5050, () => {
    console.log('Iniciando servidor');
});
