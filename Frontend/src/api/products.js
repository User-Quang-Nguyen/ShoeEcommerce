/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import { getAuthToken } from 'src/utils/jwt';

import { API_URL } from 'src/config';

export async function getProducts(currentPage) {
    try {
        const response = await axios.get(`${API_URL}/home?page=${currentPage}`, {
        });
        return response;
    } catch (error) {
        return error.response
    }
}
