import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/user.reducer';

const rootReducer = combineReducers({
    userReducer: userReducer
});

const configureStore = () => {
    return createStore(
      rootReducer
    );
};

export default configureStore;