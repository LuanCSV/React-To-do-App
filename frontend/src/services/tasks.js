import axios from 'axios';

const getAllTasks = async () => {
    const res = await axios.get('http://localhost:5050/tasks');
    return res.data;
};

const completeTaskAPI = async (task) => {
    const res = await axios.get('http://localhost:5050/tasks/complete/' + task._id);
    return res.data;
}

const deleteTaskAPI = async (task) => {
    task.deleted = true;
    const res = await axios.put('http://localhost:5050/tasks/' + task._id, task);
    return res.data;
}

const addTaskAPI = async (task) => {
    const res = await axios.post('http://localhost:5050/tasks', task);
    return res.data;
}

const updateTaskAPI = async (task) => {
    const res = await axios.put('http://localhost:5050/tasks/' + task._id, task);
    return res.data;
}

export { getAllTasks, completeTaskAPI, deleteTaskAPI, addTaskAPI, updateTaskAPI }