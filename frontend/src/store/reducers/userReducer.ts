import { UserModel } from './../../models/userModel';
import { ReduxActionModel } from '../../models/reduxModel';

interface UserModelState {
  isAuthorized: boolean;
  user: UserModel;
}

const initialState: UserModelState = {
  isAuthorized: false,
  user: {},
};

const userReducer = (state = initialState, action: ReduxActionModel) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isAuthorized: !state.isAuthorized,
      };
    case 'CLEAR_STORE':
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
