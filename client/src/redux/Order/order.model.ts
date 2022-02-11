import {createEntityAdapter, EntityState} from "@reduxjs/toolkit";

export interface Order {
    _id: string,
    userEmail: string,
    date: Date,
    itemList: Array<{instrumentName: string, quantity:number, price: number}>,
    orderAddress: string
    total: number
}

export interface OrdersState extends EntityState<Order> {
}

export const ordersAdapter = createEntityAdapter<Order>({
    selectId: (order: Order) => order._id
})

export const initialState: OrdersState = ordersAdapter.getInitialState();