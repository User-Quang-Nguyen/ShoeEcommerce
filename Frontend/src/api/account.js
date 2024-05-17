import axios from 'axios';

import { getAuthToken } from 'src/utils/jwt';

import { API_URL } from 'src/config';

export async function getUserInfor() {
    const token = getAuthToken()
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: token
              }
        });
        return response;
    } catch (error) {
        return error.response
    }
}
