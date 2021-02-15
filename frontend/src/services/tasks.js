import axios from 'axios';
import { API_URL, ID_TOKEN } from './../constants/services';

axios.defaults.headers['Authorization'] = localStorage.getItem(ID_TOKEN);

const getAllTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks/`);
    return res.data;
};

const completeTaskAPI = async (task) => {
    const res = await axios.get(`${API_URL}/tasks/complete/${task._id}`);
    return res.data;
}

const deleteTaskAPI = async (task) => {
    task.deleted = true;
    const res = await axios.put(`${API_URL}/tasks/${task._id}`, task);
    return res.data;
}

const addTaskAPI = async (task) => {
    const res = await axios.post(`${API_URL}/tasks/`, task);
    return res.data;
}

const updateTaskAPI = async (task) => {
    const res = await axios.put(`${API_URL}/tasks/${task._id}`, task);
    return res.data;
}

export { getAllTasks, completeTaskAPI, deleteTaskAPI, addTaskAPI, updateTaskAPI }