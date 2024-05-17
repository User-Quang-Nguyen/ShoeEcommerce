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