import { NavLink } from 'react-router-dom';
import { CartIcon } from '../Icons/Icons';
import User from '../User';
import './Menu.scss';

interface MenuProps {
  routes: {
    label: string;
    path: string;
    child?: Array<any>;
  }[];
}

const Menu = ({ routes }: MenuProps) => {
  return (
    <>
      <ul className="menu">
        {routes.map((item, i) => (
          <li key={i} className="menu__item">
            <NavLink to={item.path}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
      <User />
      <CartIcon />
    </>
  );
};

export default Menu;
