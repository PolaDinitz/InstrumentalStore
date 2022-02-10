import {ActionCreator, AnyAction} from 'redux';
import cartActionTypes from './cart.action-types';
import {CartProduct} from "./cart.model";

export const addItemToCart: ActionCreator<AnyAction> = (shopItem: CartProduct): AnyAction => {
  return {
    type: cartActionTypes.ADD_ITEM,
    payload: shopItem
  }
}

export const clearItemFromCart: ActionCreator<AnyAction> = (item: CartProduct): AnyAction => {
  return {
    type: cartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
  }
}

export const removeItem: ActionCreator<AnyAction> = (item: CartProduct): AnyAction => {
  return {
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
  }
}

export const clearCart: ActionCreator<AnyAction> = (): AnyAction => ({
  type: cartActionTypes.CLEAR_CART
});