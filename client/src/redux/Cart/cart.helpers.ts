import {CartProduct} from "./cart.model";

export const addItem = (cartItems: CartProduct[], cartItemToAdd: CartProduct): CartProduct[] => {
    const existingCartItem = cartItems.find(
        (cartItem: CartProduct) => cartItem._id === cartItemToAdd._id
    );

    if (existingCartItem) {
        return cartItems.map(
            (cartItem: CartProduct) =>
                cartItem._id === cartItemToAdd._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
        );
    }

    return [...cartItems, cartItemToAdd];
}

export const removeItemFromCart = (cartItems: CartProduct[], cartItemToRemove: CartProduct) => {
    const existingCartItem = cartItems.find(
        (item: CartProduct) => item._id === cartItemToRemove._id
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(
            (item: CartProduct) => item._id !== cartItemToRemove._id
        );
    }

    return cartItems.map(
        (item: CartProduct) => item._id === cartItemToRemove._id
            ? { ...item, quantity: item.quantity - 1 } : item
    );
}