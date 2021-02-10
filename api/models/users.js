const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    deleted: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    criadoEm: { type: Date, default: Date.now }
});

const user = mongoose.model('user', userSchema);

module.exports = user;