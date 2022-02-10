import {AnyAction} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {productsActionTypes} from "./product.action-types";
import {initialState, productsAdapter, ProductsState} from "./product.model";

const productsReducer: Reducer<ProductsState, AnyAction> = (state = initialState,  action: AnyAction): ProductsState => {
  const { type, payload } = action;

  switch (type) {
    case productsActionTypes.LOAD_PRODUCTS_REQUEST:
      return {
        ...state
      };

    case productsActionTypes.LOAD_PRODUCTS_SUCCESS:
      return productsAdapter.upsertMany(state, payload);

    case productsActionTypes.LOAD_PRODUCTS_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default productsReducer;
