import { AnyAction } from "@reduxjs/toolkit";
import { Product } from "../../type";
import { productsActionTypes } from "../action-types/product.action-types";

export const setProducts = (products: Product[]): AnyAction => ({
  type: productsActionTypes.SET_PRODUCTS,
  payload: products,
});
