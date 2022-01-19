import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import userReducer from '../reducers/user.reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    userState: userReducer
});

const configureStore = () => {
    return createStore(
      rootReducer,
      compose(applyMiddleware(thunk))
    );
};

export default configureStore;
