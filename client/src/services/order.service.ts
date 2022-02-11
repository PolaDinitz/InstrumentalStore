import {config} from "../config/config"
import axios from "axios";
import {authHeader} from "../utils/auth-headers";
import { CartProduct } from "../redux/Cart/cart.model";

const getOrdersByUserEmail = (email : String) => {
    return axios.get(`${config.apiUrl}/order/user/${email}`, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) => {
            throw new Error("Something went wrong while trying to get orders, " + error.message);
        })
}

const placeOrder = (userEmail: String, date: String, orderItems: Array<CartProduct>, orderAddress: String, total: number) => {
    let itemList = orderItems.map((item) => {
        return {instrumentName: item.instrumentName, quantity: item.quantity, price: item.price}
    })
    
    return axios.post(`${config.apiUrl}/order`,{userEmail, date, itemList, orderAddress,total}, {headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: Error) =>{ 
            throw new Error("Something went wrong while trying to place order " + error.message);
        })
}


export const orderService = {
    getOrdersByUserEmail,
    placeOrder
};