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

export async function productDetail(id) {
    try {
        const response = await axios.get(`${API_URL}/shoe/${id}`);
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function productManagement() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/shoe`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function updateShoeDetail(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.put(`${API_URL}/admin/shoedetail`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function addShoeDetail(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.post(`${API_URL}/admin/shoedetail`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function addNewShoe(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.post(`${API_URL}/admin/shoe`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function changeShoe(formData) {
    const token = getAuthToken();
    try {
        const response = await axios.put(`${API_URL}/admin/shoe`, formData, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function deleteShoe(shoeid) {
    const token = getAuthToken();
    try {
        const response = await axios.delete(`${API_URL}/admin/shoe?id=${shoeid}`, {
            headers: {
                Authorization: token,
            },
        });
        return response;
    } catch (err) {
        return err.response;
    }
}

export async function searchShoe(query, page, limit){
    try {
        const response = await axios.get(`${API_URL}/shoe`,{
            params: { key: query, page, limit }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}