import { createStore, combineReducers } from 'redux';
import productsReducer from '../reducers/countReducer';
const rootReducer = combineReducers({ products: productsReducer });

const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;