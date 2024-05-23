import axios from "axios";
import { getAuthToken } from "src/utils/jwt";

import { API_URL } from "src/config";

export async function addToCart(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.post(`${API_URL}/cart`, formData, {
            headers: {
                Authorization: token
            }
        });

        return response;
    } catch (e) {
        return e.response;
    }
}

export async function getCartItems() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (e) {
        return e.response;
    }
}

export async function updateQuantity(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.put(`${API_URL}/cart`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (e) {
        return e.response;
    }
}

export async function deleteItem(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${API_URL}/cart`, {
            headers: {
                Authorization: token
            },
            data: formData
        });
        return response;
    } catch (e) {
        return e.response;
    }
}
