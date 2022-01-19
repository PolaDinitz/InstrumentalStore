import { userActionTypes } from '../action-types/user.action-types';
import { User } from '../models/user.model';

interface UserState {
    user: User | null,
    loggedIn: boolean
}

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
                user: payload.user
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
