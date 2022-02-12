import {config} from "../config/config"
import axios, {AxiosError} from "axios";
import {authHeader} from "../utils/auth-headers";

const getCategories = () => {
    return axios.get(`${config.apiUrl}/categories`, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to get categories, " + error.response?.data?.message);
        })
}

export const categoryService = {
    getCategories
};
