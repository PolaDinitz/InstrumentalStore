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

    case productsActionTypes.ADD_PRODUCT_REQUEST:
      return {
        ...state
      };

    case productsActionTypes.ADD_PRODUCT_SUCCESS:
      return productsAdapter.addOne(state, payload);

    case productsActionTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state
      };

    case productsActionTypes.DELETE_PRODUCT_REQUEST:
      return {
        ...state
      };

    case productsActionTypes.DELETE_PRODUCT_SUCCESS:
      return productsAdapter.removeOne(state, payload);

    case productsActionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state
      };

    case productsActionTypes.SET_SELECTED_PRODUCT_ID:
      return {
        ...state,
        selectedProductId: payload
      };

    case productsActionTypes.EDIT_PRODUCT_REQUEST:
      return {
        ...state
      };

    case productsActionTypes.EDIT_PRODUCT_SUCCESS:
      return productsAdapter.updateOne(state, payload);

    case productsActionTypes.EDIT_PRODUCT_FAILURE:
      return {
        ...state
      };

    default:
      return state;
  }
};

export default productsReducer;
