import { UserModel } from './../../models/userModel';

const userActions = {
  setUser: (user: UserModel) => ({ type: 'SET_USER', payload: user }),
  setAuthorized: () => ({ type: 'SET_AUTHORIZED' }),
};

export default userActions;
