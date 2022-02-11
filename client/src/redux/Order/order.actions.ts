import { Order } from "./order.model";
import { orderActionTypes } from "./order.action-types";
import { AppDispatch } from "../../type";
import { toast } from "react-toastify";
import { orderService } from "../../services/order.service";

const loadOrdersByEmailRequestAction = (email : String) => { return { type: orderActionTypes.LOAD_ORDERS_BY_EMAIL_REQUEST } }
const loadOrdersByEmailSuccessAction = (orders: Order[]) => { return { type: orderActionTypes.LOAD_ORDERS_BY_EMAIL_SUCCESS, payload: orders } }
const loadOrdersByEmailFailureAction = (error: Error) => { return { type: orderActionTypes.LOAD_ORDERS_BY_EMAIL_FAILURE, payload: error } }

const loadOrdersByEmail = (email : String) => {
  return (dispatch: AppDispatch) => {
    dispatch(loadOrdersByEmailRequestAction);
    orderService.getOrdersByUserEmail(email)
      .then((orders: Order[]) => {
        dispatch(loadOrdersByEmailSuccessAction(orders));
      })
      .catch((error: Error) => {
        dispatch(loadOrdersByEmailFailureAction(error));
        toast.error(error.message);
      });
  };
}

export const ordersActions = {
  loadOrdersByEmail,
};
