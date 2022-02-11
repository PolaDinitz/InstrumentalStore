import {config} from "../config/config"
import axios from "axios";
import {authHeader} from "../utils/auth-headers";

const getOrdersByUserEmail = (email : String) => {
    return axios.get(`${config.apiUrl}/order/user/${email}`, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            throw new Error("Something went wrong while trying to get orders, " + error.message);
        })
}

export const orderService = {
    getOrdersByUserEmail
};