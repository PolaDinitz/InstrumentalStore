import {productsAdapter} from "./product.model";
import {RootState} from "../../type";

export const productsSelector = productsAdapter.getSelectors<RootState>(
    (state) => state.productsState
)
