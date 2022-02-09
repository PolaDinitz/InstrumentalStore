export interface Product {
    title: string;
    price: number;
    id: string;
    img: string;
}

export interface ProductsStateType {
    products: Product[] | [];
  }

export interface CartProduct extends Product {
    quantity: number;
}

export interface CartState {
    cartItems: CartProduct[] | [];
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch