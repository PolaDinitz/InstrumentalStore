import { AnyAction } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { ProductsStateType } from "../../type";
import { productsActionTypes } from "../action-types/product.action-types";

const initial_state: ProductsStateType = {
  products: [],
};

const productsReducer: Reducer<ProductsStateType, AnyAction> = (
  state = initial_state,
  { type, payload }
): ProductsStateType => {
  switch (type) {
    case productsActionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export default productsReducer;
