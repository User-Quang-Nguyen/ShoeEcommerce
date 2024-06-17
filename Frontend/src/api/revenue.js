import axios from 'axios';

import { getAuthToken } from 'src/utils/jwt';

import { API_URL } from 'src/config';

export async function getRevenueDaily() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/daily`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getRevenueWeek() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/week`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getRevenueMonth() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/month`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getRevenuePending() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/pending`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getRevenueCanceled() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/canceled`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getRevenueSuccess() {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/success`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getDayOnMonth(year, month) {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/dayonmonth?year=${year}&month=${month}`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}

export async function getMonthonYear(year) {
    const token = getAuthToken();
    try {
        const response = await axios.get(`${API_URL}/admin/revenue/monthonyear?year=${year}`, {
            headers: {
                Authorization: token
            }
        });
        return response;
    } catch (error) {
        return error.response
    }
}