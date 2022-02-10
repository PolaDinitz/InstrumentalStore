import {toast} from 'react-toastify';
import {categoryService} from "../../services/category.service";
import {categoryActionTypes} from './category.action-types';
import {Category} from "./category.model";
import {AppDispatch} from "../../type";

const loadCategoriesRequestAction = () => { return { type: categoryActionTypes.LOAD_CATEGORIES_REQUEST } }
const loadCategoriesSuccessAction = (categories: Category[]) => { return { type: categoryActionTypes.LOAD_CATEGORIES_SUCCESS, payload: categories } }
const loadCategoriesFailureAction = (error: Error) => { return { type: categoryActionTypes.LOAD_CATEGORIES_FAILURE, payload: error } }

const loadCategories = () =>{
    return (dispatch: AppDispatch) => {
        dispatch(loadCategoriesRequestAction);
        categoryService.getCategories()
            .then((categories: Category[]) => {
                dispatch(loadCategoriesSuccessAction(categories));
            })
            .catch((error: Error) => {
                dispatch(loadCategoriesFailureAction(error));
                toast.error(error.message);
            });
    };
}

export const categoryActions = {
    loadCategories
};
