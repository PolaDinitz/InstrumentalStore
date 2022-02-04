import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../reducers/user.reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    userState: userReducer,
});

const composeEnhancers = composeWithDevTools({});

const configureStore = () => {
    return createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(thunk))
    );
};

const store = configureStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
