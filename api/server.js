const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: "Mensagem" })
});

app.get('/tasks', (req, res, next) => {
    const initialTasks = [
        {
            state: false,
            description: 'JOGAR',
            id: 1
        },
        {
            state: false,
            description: 'COMER',
            id: 2
        },
        {
            state: true,
            description: 'LAVAR LOUCA',
            id: 3
        },
        {
            state: true,
            description: 'COZINHAR',
            id: 4
        },
    ];

    res.json(initialTasks)
});

app.listen(5050, () => {
    console.log('Iniciando servidor');
});
