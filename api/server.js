const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB conectado');
});

const app = express();

app.use(cors());
app.use(express.json());

// rotas
require('./routes/main')(app);

app.listen(5050, () => {
    console.log('Iniciando servidor');
});
