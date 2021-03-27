import Icons from '../Icons';
import Menu from '../Menu';
import './Header.scss';
import { routes } from '../../utils/routes';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <Icons.Logo />
      </div>
      <Menu routes={routes} />
    </header>
  );
};

export default Header;
