import axios from "axios";

import { API_URL } from "src/config";

export async function Signup (formData) {
    try {
        const response = await axios.post(`${API_URL}/authentication/register`, formData);
        return response;
    }catch (err){
        return err.response;
    }
}