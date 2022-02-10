import {userActionTypes} from './user.action-types';
import {UserState} from "./user.model";

let initialState: UserState = {
    user: null,
    loggedIn: false
};

const userInLocalStorage = localStorage.getItem('user');
if (userInLocalStorage) {
    initialState = {
        user: JSON.parse(userInLocalStorage),
        loggedIn: true
    }
}

const reducer = (state = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case userActionTypes.LOGIN_REQUEST:
            return {
                ...state
            };
        case userActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: payload
            };
        case userActionTypes.LOGIN_FAILED:
            return {
                ...state,
                user: null
            };
        case userActionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: null
            };
        default:
            return state
    }
}

export default reducer;
