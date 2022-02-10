import {ActionCreator, AnyAction} from 'redux';
import cartActionTypes from './cart.action-types';
import {CartProduct} from "./cart.model";
import {toast} from "react-toastify";

const addItemToCart: ActionCreator<AnyAction> = (shopItem: CartProduct): AnyAction => {
  toast.info("An item added to your cart!");
  return {
    type: cartActionTypes.ADD_ITEM,
    payload: shopItem
  }
}

const clearItemFromCart: ActionCreator<AnyAction> = (item: CartProduct): AnyAction => {
  toast.info("An item was removed from your cart!");
  return {
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
  }
}

const removeItem: ActionCreator<AnyAction> = (item: CartProduct): AnyAction => {
  toast.info("An item's quantity was reduced by one!");
  return {
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
  }
}

const clearCart: ActionCreator<AnyAction> = (): AnyAction => ({
  type: cartActionTypes.CLEAR_CART
});

export const cartActions = {
  addItemToCart,
  clearItemFromCart,
  removeItem,
  clearCart
};