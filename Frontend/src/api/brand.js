import axios from 'axios';

import { API_URL } from 'src/config';

export async function getAllBrand() {
    try {
        const response = await axios.get(`${API_URL}/brand`);
        return response;
    } catch (error) {
        return error.response
    }
}
