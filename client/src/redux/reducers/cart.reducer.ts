import { Reducer, AnyAction } from 'redux';
import cartActionTypes from '../action-types/cart.action-types';
import { CartState, CartProduct } from '../../type';
import { addItem, removeItemFromCart } from '../helpers/cart.utils';

const INITIAL_STATE: CartState = {
  cartItems: []
}

const cartReducer: Reducer<CartState, AnyAction> = (
  state = INITIAL_STATE, action
): CartState => {
  switch (action.type) {
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItem(state.cartItems, action.payload)
      }

    case cartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item: CartProduct) => item.id !== action.payload.id
        )
      }

    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      }

    case cartActionTypes.CLEAR_CART:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export default cartReducer;