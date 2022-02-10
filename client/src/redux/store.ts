import {applyMiddleware, combineReducers, createStore} from 'redux';
import userReducer from './User/user.reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import cartReducer from './Cart/cart.reducer';
import productsReducer from './Product/product.reducer';

const rootReducer = combineReducers({
    userState: userReducer,
    cartState: cartReducer,
    productsState: productsReducer,
});

const composeEnhancers = composeWithDevTools({});

const configureStore = () => {
    return createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk))
    );
};

const store = configureStore();

export default store;
