import {productsActionTypes} from "./product.action-types";
import {Product} from "./product.model";
import {AppDispatch} from "../../type";
import {toast} from "react-toastify";
import {productService} from "../../services/product.service";

const loadProductsRequestAction = () => { return { type: productsActionTypes.LOAD_PRODUCTS_REQUEST } }
const loadProductsSuccessAction = (products: Product[]) => { return { type: productsActionTypes.LOAD_PRODUCTS_SUCCESS, payload: products } }
const loadProductsFailureAction = (error: Error) => { return { type: productsActionTypes.LOAD_PRODUCTS_FAILURE, payload: error } }

const loadProducts = () => {
  return (dispatch: AppDispatch) => {
    dispatch(loadProductsRequestAction);
    productService.getProducts()
      .then((products: Product[]) => {
        dispatch(loadProductsSuccessAction(products));
      })
      .catch((error: Error) => {
        dispatch(loadProductsFailureAction(error));
        toast.error(error.message);
      });
  };
}

export const productsActions = {
  loadProducts,
};
