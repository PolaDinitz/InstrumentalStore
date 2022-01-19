import { userActionTypes } from '../action-types/user.action-types';

let user = JSON.parse(localStorage.getItem('user') || '{}');
const initialState = user !== '{}' ? { loggedIn: true, user } : {loggedIn: false};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case userActionTypes.LOGIN_REQUEST:
            return {
                ...state
            };
        case userActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.user
            };
        case userActionTypes.LOGIN_FAILED:
            return {
                ...state
            };
        case userActionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false
            };
        default:
            return state
    }
}

export default reducer;