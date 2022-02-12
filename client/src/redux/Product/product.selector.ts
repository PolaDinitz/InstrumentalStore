import {Product, productsAdapter, ProductsState} from "./product.model";
import {RootState} from "../../type";
import {createSelector, Selector} from "reselect";

const selectProductsState = (state: RootState): ProductsState => state.productsState;

export const productsSelector = productsAdapter.getSelectors<RootState>(
    (state: RootState) => state.productsState
)

export const selectSelectedProductId: Selector<RootState, string | null> = createSelector(
    [selectProductsState],
    (productsState: ProductsState): string | null => productsState.selectedProductId
);

export const selectSelectedProduct: Selector<RootState, Product | undefined> = createSelector(
    [productsSelector.selectAll, selectSelectedProductId],
    (products: Product[], productId: string | null): Product | undefined => {
        if (productId)
            return products.find((product: Product) => product._id === productId);
    }
);