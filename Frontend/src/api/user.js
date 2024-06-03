import axios from "axios";
import { getAuthToken } from "src/utils/jwt";

import { API_URL } from "src/config";

export async function updateInfor(formData){
    const token = getAuthToken();
    try {
        const response = await axios.put(`${API_URL}/user`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getAllUsers() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/user`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function deleteUser(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${API_URL}/admin/user`, {
            headers: {
                Authorization: token
            },
            data: formData
        });
        return response;
    } catch (error) {
        return error.response
    }
}