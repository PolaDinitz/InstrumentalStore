import { config } from "../config/config"
import axios from "axios";
import HttpStatusCode from "../enums/http-status-codes";

const login = (email: String, password: String) => {
    return axios.post(`${config.apiUrl}/auth/login`, { email, password})
        .then(handleResponse)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
    });
}

const logout = () => {
    localStorage.removeItem('user');
}

const handleResponse = (response: any) => {
    return response.text().then((text: string ) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === HttpStatusCode.UNAUTHORIZED) {
                logout();
                window.location.reload();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const userService = {
    login,
    logout
};
