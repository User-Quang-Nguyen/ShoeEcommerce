import axios from 'axios';

import { API_URL } from 'src/config';

export async function payment(formData) {
    try {
        const response = await axios.post(`${API_URL}/payment`, formData);
        return response;
    } catch (error) {
        return error.response
    }
}

export async function checkPayment(id) {
    try {
        const response = await axios.post(`${API_URL}/payment/order-status/${id}`);
        return response;
    } catch (error) {
        return error.response
    }
}