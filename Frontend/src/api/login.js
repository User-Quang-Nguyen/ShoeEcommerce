import axios from 'axios';

import { API_URL } from 'src/config';

export async function login(formData) {
    try {
        const response = await axios.post(`${API_URL}/authentication/login`, formData);
        return response;
    } catch (error) {
        return error.response
    }
}
