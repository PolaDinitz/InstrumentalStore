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
    buildFormData(product, formData, image);
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

const editProduct = (product: Partial<Product>, image?: File) => {
    const formData = new FormData();
    buildFormData(product, formData, image);
    return axios.patch(`${config.apiUrl}/instrument/` + product._id, formData, { headers:
            {
                "Authorization" : `Bearer ${authHeader()}`,
                'Content-Type': 'multipart/form-data'
            }})
        .then((response) => {
            return response.data;
        })
        .catch((error: AxiosError) => {
            throw new Error("Something went wrong while trying to edit a product, " + error.response?.data?.message);
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

const buildFormData = (product: Partial<Product>, formData: FormData, image?: File) => {
    if (product?.instrumentName)
        formData.set('instrumentName', product.instrumentName!);
    if (product?.description)
        formData.set('description', product.description!);
    if (product?.category)
        formData.set('category', product.category!);
    if (product?.price)
        formData.set('price', product.price!.toString());
    if (image)
        formData.set('image', image, image.name);
}

export const productService = {
    getProducts,
    addProduct,
    deleteProduct,
    editProduct
};