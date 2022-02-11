import {config} from "../config/config"
import axios, {AxiosError} from "axios";

const register = (firstName: String, lastName: String, email: String, password: String, confirmPassword: String) => {
    return axios.put(`${config.apiUrl}/user`, { firstName, lastName, email, password, confirmPassword })
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to register, " + error.response?.data?.message);
        })
}

const login = (email: String, password: String) => {
    return axios.post(`${config.apiUrl}/auth/login`, { email, password })
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Incorrect email and/or password, " + error.response?.data?.message);
        })
}

const logout = () => {
    localStorage.removeItem('user');
}

export const userService = {
    register,
    login,
    logout
};
