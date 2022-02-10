import { userActionTypes } from './user.action-types';
import { userService } from '../../services/user.service';
import { toast } from 'react-toastify';
import { User } from './user.model';
import { AppDispatch } from '../../type';

const registerRequestAction = () => { return { type: userActionTypes.REGISTER_REQUEST } }
const registerSuccessAction = () => { return { type: userActionTypes.REGISTER_SUCCESS } }
const registerFailedAction = (error: Error) => { return { type: userActionTypes.REGISTER_FAILED, payload: error } }
const loginRequestAction = () => { return { type: userActionTypes.LOGIN_REQUEST } }
const loginSuccessAction = (user: User) => { return { type: userActionTypes.LOGIN_SUCCESS, payload: user } }
const loginFailedAction = (error: Error) => { return { type: userActionTypes.LOGIN_FAILED, payload: error } }
const logoutAction = () => { return { type: userActionTypes.LOGOUT } }

const register = (firstName: String, lastName: String, email: String, password: String, confirmPassword: String) =>{
    return (dispatch: AppDispatch) => {
        dispatch(registerRequestAction());
        userService.register(firstName, lastName, email, password, confirmPassword)
            .then(() => { 
                dispatch(registerSuccessAction());
                toast.success("Registered Successfully");
                window.location.replace("/login");
            })
            .catch((error: Error) => {
                dispatch(registerFailedAction(error));
                toast.error(error.message);
            });
    };
}

const login = (email: String, password: String) =>{
    return (dispatch: AppDispatch) => {
        dispatch(loginRequestAction());
        userService.login(email, password)
            .then((user: User)=> { 
                dispatch(loginSuccessAction(user));
                toast.success("Login Successfully");
                window.location.replace("/");
            })
            .catch((error: Error) => {
                dispatch(loginFailedAction(error));
                toast.error(error.message);
            });
    };
}

const logout = () => {
    return (dispatch: any) => {
        userService.logout();
        dispatch(logoutAction());
        toast.success("Logout Successfully");
    }
}

export const userActions = {
    login,
    logout,
    register
};
