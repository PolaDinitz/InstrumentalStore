import {AnyAction, Reducer} from 'redux';
import cartActionTypes from './cart.action-types';
import {addItem, removeItemFromCart} from './cart.helpers';
import {CartProduct, CartState} from './cart.model';

const initialState: CartState = {
  cartItems: []
}

const cartReducer: Reducer<CartState, AnyAction> = (state = initialState, action: AnyAction): CartState => {
  const { type, payload } = action;

  switch (type) {
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItem(state.cartItems, payload)
      }

    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item: CartProduct) => item._id !== payload._id
        )
      }

    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, payload)
      }

    case cartActionTypes.CLEAR_CART:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export default cartReducer;