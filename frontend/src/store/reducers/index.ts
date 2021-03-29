import { combineReducers } from 'redux';
import productsStore from './productsReducer';
import snackbarStore from './snackbarReducer';

const rootReducer = combineReducers({
  snackbarStore,
  productsStore,
});

export default rootReducer;
