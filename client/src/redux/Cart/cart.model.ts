import {Product} from "../Product/product.model";

export interface CartProduct extends Product {
    quantity: number;
}

export interface CartState {
    cartItems: CartProduct[];
}