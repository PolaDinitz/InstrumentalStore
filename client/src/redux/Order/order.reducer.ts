import {AnyAction} from "@reduxjs/toolkit";
import {Reducer} from "react";
import { orderActionTypes } from "./order.action-types";
import {initialState, ordersAdapter, OrdersState} from "./order.model";

const ordersReducer: Reducer<OrdersState, AnyAction> = (state = initialState,  action: AnyAction): OrdersState => {
  const { type, payload } = action;

  switch (type) {
    case orderActionTypes.LOAD_ORDERS_BY_EMAIL_REQUEST:
      return {
        ...state
      };

    case orderActionTypes.LOAD_ORDERS_BY_EMAIL_SUCCESS:
      return ordersAdapter.setAll(state, payload);

    case orderActionTypes.LOAD_ORDERS_BY_EMAIL_FAILURE:
      return {
        ...state
      };

    case orderActionTypes.CLEAR_ORDERS:
      return ordersAdapter.removeAll(state);

    default:
      return state;
  }
};

export default ordersReducer;
