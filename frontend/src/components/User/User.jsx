// import { User } from '../Icons/Icons';
import { useSelector } from 'react-redux';
import Authorized from '../Authorized';
import Login from '../Login';
import './User.scss';

const User = () => {
  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  return isAuthorized ? <Authorized /> : <Login />;
};

export default User;
