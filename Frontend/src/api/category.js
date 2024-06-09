import axios from 'axios';

import { API_URL } from 'src/config';

export async function getAllCategory() {
    try {
        const response = await axios.get(`${API_URL}/category`);
        return response;
    } catch (error) {
        return error.response
    }
}
