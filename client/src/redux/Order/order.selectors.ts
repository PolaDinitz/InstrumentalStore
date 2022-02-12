import { ordersAdapter } from "./order.model";
import {RootState} from "../../type";

export const ordersSelector = ordersAdapter.getSelectors<RootState>(
    (state) => state.ordersState
)
