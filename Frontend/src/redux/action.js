import { getUserInfor } from "src/api/account";

export const GET_ACCOUNT = 'GET_ACCOUNT';

export const getAccount = () => async (dispatch) => {
    try {
        const response = await getUserInfor();
        if (response.data.status == false){
            throw Error(response.data.message);
        }
        const userData = response.data;
        dispatch({
            type: GET_ACCOUNT,
            payload: userData,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};