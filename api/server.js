const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./models/task-model');

const routes = require('./routes/todos');

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
app.use('/tasks', routes);

app.get('/', (req, res) => {
    res.json({ message: "Mensagem" })
});



app.listen(5050, () => {
    console.log('Iniciando servidor');
});
