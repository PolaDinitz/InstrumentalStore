import { userActionTypes } from '../action-types/user.action-types';
import { userService } from '../../services/user.service';
import { history } from '../helpers/history';
import { toast } from 'react-toastify';
import { User } from '../models/user.model';

const loginRequestAction = () => { return { type: userActionTypes.LOGIN_REQUEST } }
const loginSuccessAction = (user: User) => { return { type: userActionTypes.LOGIN_SUCCESS, payload: user } }
const loginFailedAction = (error: Error) => { return { type: userActionTypes.LOGIN_FAILED, payload: error } }
const logoutAction = () => { return { type: userActionTypes.LOGOUT } }

const login = (email: String, password: String) =>{
    return (dispatch: any) => {
        dispatch(loginRequestAction());
        userService.login(email, password)
            .then((user: User)=> { 
                dispatch(loginSuccessAction(user));
                toast.success("Login Successfully");
                history.push('/');
            })
            .catch((error: Error) => {
                dispatch(loginFailedAction(error));
                toast.error(error.message);
            });
    };
}

const logout = () => {
    userService.logout();
    return logoutAction();
}

export const userActions = {
    login,
    logout
};
