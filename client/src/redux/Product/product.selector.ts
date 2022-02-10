import {Product, productsAdapter, ProductsState} from "./product.model";
import {EntityState} from "@reduxjs/toolkit";
import {RootState} from "../../type";

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
} = productsAdapter.getSelectors<EntityState<Product>>((state) => state)
