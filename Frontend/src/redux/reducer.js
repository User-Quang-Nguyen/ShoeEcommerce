import { GET_ACCOUNT } from './action';

const initialState = {
    account: { "name": "Guest", "email": "Not logged in yet"},
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACCOUNT:
            return {
                ...state,
                account: action.payload,
            };
        default:
            return state;
    }
};

export default accountReducer;
