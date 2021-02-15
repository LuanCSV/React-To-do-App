import axios from 'axios';
import { API_URL } from './../constants/services';

const authUser = async (body) => {
    const res = await axios.post(`${API_URL}/users/auth`, body);
    return res.data;
};

export { authUser };