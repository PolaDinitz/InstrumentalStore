import {createEntityAdapter, EntityState} from "@reduxjs/toolkit";

export interface Product {
    _id: string;
    instrumentName: string;
    description: string;
    photoUrl: string;
    category: string;
    price: number;
}

export interface ProductsState extends EntityState<Product> {
    selectedProductId: string | null;
}

export const productsAdapter = createEntityAdapter<Product>({
    selectId: (product: Product) => product._id
})

export const initialState: ProductsState = productsAdapter.getInitialState({
    selectedProductId: null
});