import axios from 'axios';
import { getAuthToken } from "src/utils/jwt";

import { API_URL } from 'src/config';

export async function getTotalMoney() {
    const token = getAuthToken();

    try {
        const response = await axios.get(`${API_URL}/order/money`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function order() {
    const token = getAuthToken();
    try {
        const response = await axios.post(`${API_URL}/order`, {}, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getOrders() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/order`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function updateStatus(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.put(`${API_URL}/order`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function adminGetOrders() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/order`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function adminUpdateStatus(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.put(`${API_URL}/order`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}