import { userActionTypes } from '../action-types/user.action-types';
import { userService } from '../../services/user.service';
import { history } from '../helpers/history';

const loginRequestAction = () => { return { type: userActionTypes.LOGIN_REQUEST } }
const loginSuccessAction = (user: any) => { return { type: userActionTypes.LOGIN_SUCCESS, payload: user } }
const loginFailedAction = (error: any) => { return { type: userActionTypes.LOGIN_FAILED, payload: error } }
const logoutAction = () => { return { type: userActionTypes.LOGOUT } }

const login = (email: String, password: String) =>{
    return (dispatch: any) => {
        dispatch(loginRequestAction());
        userService.login(email, password)
            .then(
                (user: any)=> { 
                    dispatch(loginSuccessAction(user));
                    history.push('/');
                },
                (error: any) => {
                    dispatch(loginFailedAction(error));
                }
            );
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
