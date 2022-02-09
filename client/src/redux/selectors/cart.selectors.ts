import { createSelector, Selector } from 'reselect';
import { RootState, CartState, CartProduct } from '../../type';

const selectCart = (state: RootState): CartState => state.cart;

export const selectCartItems: Selector<RootState, CartProduct[]> = createSelector(
  [selectCart],
  (cart: CartState): CartProduct[] => cart.cartItems
);

export const selectCartItemsCount: Selector<RootState, number> = createSelector(
  [selectCartItems],
  (cartItems: CartProduct[]): number =>
    cartItems.reduce((acc: number, item: CartProduct) => acc + item.quantity, 0)
);

export const selectCartTotal: Selector<RootState, number> = createSelector(
  [selectCartItems],
  (cartItems: CartProduct[]): number =>
    cartItems.reduce((acc: number, item: CartProduct) => acc + item.quantity * item.price, 0)
);