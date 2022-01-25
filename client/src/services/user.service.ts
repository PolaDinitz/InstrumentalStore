import { config } from "../config/config"
import axios from "axios";

const register = (firstName: String, lastName: String, email: String, password: String, confirmPassword: String) => {
    return axios.put(`${config.apiUrl}/user`, { firstName, lastName, email, password, confirmPassword })
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            throw new Error("Something went wrong while trying to register, " + error.message);
        })
}

const login = (email: String, password: String) => {
    return axios.post(`${config.apiUrl}/auth/login`, { email, password })
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data;
        })
        .catch((error: Error) => {
            throw new Error("Incorrect email and/or password, " + error.message);
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
