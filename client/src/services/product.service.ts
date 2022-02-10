import {config} from "../config/config"
import axios from "axios";
import {authHeader} from "../utils/auth-headers";

const getProducts = () => {
    return axios.get(`${config.apiUrl}/instrument`, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            throw new Error("Something went wrong while trying to get products, " + error.message);
        })
}

export const productService = {
    getProducts
};