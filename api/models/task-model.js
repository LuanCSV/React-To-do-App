const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description: { type: String, required: true },
    state: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
