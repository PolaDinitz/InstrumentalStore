import {createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";

export interface Product {
    id: string;
    instrumentName: string;
    description: string;
    photoUrl: string;
    category: string;
    price: number;
}

export interface ProductsState extends EntityState<Product> {
}

export const productsAdapter = createEntityAdapter<Product>({
    selectId: (product: Product) => product.id
})

export const initialState: ProductsState = productsAdapter.getInitialState();