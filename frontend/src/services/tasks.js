import axios from 'axios';

const getAllTasks = async () => {
    const res = await axios.get('http://localhost:5050/tasks');
    console.log(res.data);
    return res.data;
};

const completeTaskAPI = async (task) => {
    const res = await axios.get('http://localhost:5050/tasks/complete/'+task._id);
    return res.data;
}

const deleteTaskAPI = async (task) => {
    const res = await axios.delete('http://localhost:5050/tasks/delete/'+task._id);
    return res.data;
}

const addTaskAPI = async (task) => {
    const res = await axios.post('http://localhost:5050/tasks', task);
    return res.data;
}

export { getAllTasks, completeTaskAPI, deleteTaskAPI, addTaskAPI }