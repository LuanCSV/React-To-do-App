const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    description: { type: String, required: true },
    state: { type: Boolean, default: false }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
