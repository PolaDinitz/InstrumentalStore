import {Order} from "./order.model";
import {orderActionTypes} from "./order.action-types";
import {AppDispatch} from "../../type";
import {toast} from "react-toastify";
import {orderService} from "../../services/order.service";
import {CartProduct} from "../Cart/cart.model";

const loadOrdersByEmailRequestAction = (email: String) => {
  return { type: orderActionTypes.LOAD_ORDERS_BY_EMAIL_REQUEST };
};
const loadOrdersByEmailSuccessAction = (orders: Order[]) => {
  return {
    type: orderActionTypes.LOAD_ORDERS_BY_EMAIL_SUCCESS,
    payload: orders,
  };
};
const loadOrdersByEmailFailureAction = (error: Error) => {
  return {
    type: orderActionTypes.LOAD_ORDERS_BY_EMAIL_FAILURE,
    payload: error,
  };
};
const placeOrderRequestAction = () => {
  return { type: orderActionTypes.PLACE_ORDER_REQUEST };
};
const placeOrderSuccessAction = () => {
  return { type: orderActionTypes.PLACE_ORDER_SUCCESS };
};
const placeOrderFailedAction = (error: Error) => {
  return { type: orderActionTypes.PLACE_ORDER_FAILURE, payload: error };
};
const clearOrders = () => {
  return { type: orderActionTypes.CLEAR_ORDERS };
};

const loadOrdersByEmail = (email: String) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadOrdersByEmailRequestAction);
    orderService
      .getOrdersByUserEmail(email)
      .then((orders: Order[]) => {
        dispatch(loadOrdersByEmailSuccessAction(orders));
      })
      .catch((error: Error) => {
        dispatch(loadOrdersByEmailFailureAction(error));
        toast.error(error.message);
      });
  };
};

const placeOrder = (
  email: String,
  itemList: CartProduct[],
  orderAddress: String,
  total: number
) => {
  return (dispatch: AppDispatch) => {
    dispatch(placeOrderRequestAction());
    orderService
      .placeOrder(email, itemList, orderAddress, total)
      .then(() => {
        dispatch(placeOrderSuccessAction());
        toast.success("Order placed Successfully");
        window.location.replace("/");
      })
      .catch((error: Error) => {
        dispatch(placeOrderFailedAction(error));
        toast.error(error.message);
      });
  };
};

export const ordersActions = {
  loadOrdersByEmail,
  placeOrder,
  clearOrders
};
