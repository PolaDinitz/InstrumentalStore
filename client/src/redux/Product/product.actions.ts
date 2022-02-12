import {productsActionTypes} from "./product.action-types";
import {Product} from "./product.model";
import {AppDispatch} from "../../type";
import {toast} from "react-toastify";
import {productService} from "../../services/product.service";

const loadProductsRequestAction = () => { return { type: productsActionTypes.LOAD_PRODUCTS_REQUEST } }
const loadProductsSuccessAction = (products: Product[]) => { return { type: productsActionTypes.LOAD_PRODUCTS_SUCCESS, payload: products } }
const loadProductsFailureAction = (error: Error) => { return { type: productsActionTypes.LOAD_PRODUCTS_FAILURE, payload: error } }

const addProductRequestAction = () => { return { type: productsActionTypes.ADD_PRODUCT_REQUEST } }
const addProductSuccessAction = (product: Product) => { return { type: productsActionTypes.ADD_PRODUCT_SUCCESS, payload: product } }
const addProductFailureAction = (error: Error) => { return { type: productsActionTypes.ADD_PRODUCT_FAILURE, payload: error } }

const deleteProductRequestAction = () => { return { type: productsActionTypes.DELETE_PRODUCT_REQUEST } }
const deleteProductSuccessAction = (id: string) => { return { type: productsActionTypes.DELETE_PRODUCT_SUCCESS, payload: id } }
const deleteProductFailureAction = (error: Error) => { return { type: productsActionTypes.DELETE_PRODUCT_FAILURE, payload: error } }

const editProductRequestAction = () => { return { type: productsActionTypes.EDIT_PRODUCT_REQUEST } }
const editProductSuccessAction = (product: Product) => { return { type: productsActionTypes.EDIT_PRODUCT_SUCCESS, payload: product } }
const editProductFailureAction = (error: Error) => { return { type: productsActionTypes.EDIT_PRODUCT_FAILURE, payload: error } }

const setSelectedProductId = (id: string) => { return { type: productsActionTypes.SET_SELECTED_PRODUCT_ID, payload: id } }

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

const addProduct = (product: Partial<Product>, image?: File) => {
    return (dispatch: AppDispatch) => {
    dispatch(addProductRequestAction());
    productService.addProduct(product, image)
        .then((product: Product) => {
          dispatch(addProductSuccessAction(product));
          toast.success("You have added the product successfully!");
            window.location.replace("/products/dashboard");
        })
        .catch((error: Error) => {
          dispatch(addProductFailureAction(error));
          toast.error(error.message);
        });
    };
}

const editProduct = (product: Partial<Product>, image?: File) => {
    return (dispatch: AppDispatch) => {
        dispatch(editProductRequestAction());
        productService.editProduct(product, image)
            .then((product: Product) => {
                dispatch(editProductSuccessAction(product));
                toast.success("You have edited the product successfully!");
                window.location.replace("/products/dashboard");
            })
            .catch((error: Error) => {
                dispatch(editProductFailureAction(error));
                toast.error(error.message);
            });
    };
}

const deleteProduct = (id: string) => {
    return (dispatch: AppDispatch) => {
    dispatch(deleteProductRequestAction());
    productService.deleteProduct(id)
        .then(() => {
            dispatch(deleteProductSuccessAction(id));
            toast.success("You have removed the product successfully!");
        })
        .catch((error: Error) => {
            dispatch(deleteProductFailureAction(error));
            toast.error(error.message);
        });
    };
}

export const productsActions = {
    loadProducts,
    addProduct,
    deleteProduct,
    setSelectedProductId,
    editProduct
};
