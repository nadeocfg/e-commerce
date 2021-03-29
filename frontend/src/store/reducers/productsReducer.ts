import { ReduxActionModel } from '../../models/reduxModel';
import { CLEAR_STORE, SET_PRODUCTS } from '../storeConstants/productsConstants';

const initialState = {
  productList: [],
};

const productsReducer = (state = initialState, action: ReduxActionModel) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };
    case CLEAR_STORE:
      return initialState;
    default:
      return state;
  }
};

export default productsReducer;
