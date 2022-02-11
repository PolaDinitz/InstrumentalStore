import {config} from "../config/config"
import axios, {AxiosError} from "axios";
import {authHeader} from "../utils/auth-headers";
import {Product} from "../redux/Product/product.model";

const getProducts = () => {
    return axios.get(`${config.apiUrl}/instrument`, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to get products, " + error.response?.data?.message);
        })
}

const addProduct = (product: Partial<Product>, image?: File) => {
    const formData = new FormData();
    formData.set('instrumentName', product.instrumentName!);
    formData.set('description', product.description!);
    formData.set('category', product.category!);
    formData.set('price', product.price!.toString());
    if (image)
        formData.set('image', image, image.name);
    return axios.put(`${config.apiUrl}/instrument`, formData, { headers:
            {
                "Authorization" : `Bearer ${authHeader()}`,
                'Content-Type': 'multipart/form-data'
            }})
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to add product, " + error.response?.data?.message);
        })
}

const deleteProduct = (id: string) => {
    return axios.delete(`${config.apiUrl}/instrument/` + id, { headers: {"Authorization" : `Bearer ${authHeader()}`}})
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to delete product, " + error.response?.data?.message);
        })
}

export const productService = {
    getProducts,
    addProduct,
    deleteProduct
};