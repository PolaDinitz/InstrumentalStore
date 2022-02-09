import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../reducers/user.reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from '../reducers/cart.reducer';
import productsReducer from '../reducers/product.reducer';

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
