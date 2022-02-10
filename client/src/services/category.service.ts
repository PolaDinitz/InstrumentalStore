import {config} from "../config/config"
import axios from "axios";
import {authHeader} from "../utils/auth-headers";

const getCategories = () => {
    return axios.get(`${config.apiUrl}/categories`, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            throw new Error("Something went wrong while trying to get categories, " + error.message);
        })
}

export const categoryService = {
    getCategories
};
