import {applyMiddleware, combineReducers, createStore} from 'redux';
import userReducer from './User/user.reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import cartReducer from './Cart/cart.reducer';
import productsReducer from './Product/product.reducer';
import categoryReducer from "./Category/category.reducer";
import ordersReducer from './Order/order.reducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    userState: userReducer,
    cartState: cartReducer,
    productsState: productsReducer,
    categoryState: categoryReducer,
    ordersState: ordersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = composeWithDevTools({});

const configureStore = () => {
    return createStore(
        persistedReducer,
        composeEnhancers(applyMiddleware(thunk))
    );
};

export const store = configureStore();
export const persistor = persistStore(store);