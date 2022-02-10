import {Category} from "./category.model";
import {categoryActionTypes} from "./category.action-types";

interface CategoryState {
    categories: Category[]
}

let initialState: CategoryState = {
    categories: [],
};

const reducer = (state = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case categoryActionTypes.LOAD_CATEGORIES_REQUEST:
            return {
                ...state
            };
        case categoryActionTypes.LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload
            };
        case categoryActionTypes.LOAD_CATEGORIES_FAILURE:
            return {
                ...state,
            };
        default:
            return state
    }
}

export default reducer;
