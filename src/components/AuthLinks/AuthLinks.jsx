import { Link } from 'react-router-dom';
import css from './AuthLinks.module.css';

const AuthLinks = ({ closeSidebar, isDesktop, isHomePage }) => {

  return (
    <nav className={css.authLinks}>
      <Link
        to='/register'
        className={`${css.link}  ${
          isDesktop && !isHomePage ? css.register : css.registerHome
        } `}
        onClick={closeSidebar}>
        Register
      </Link>
      <Link
        to='/login'
        className={`${css.link}  ${isDesktop && !isHomePage  ? css.login : css.loginHome} `}
        onClick={closeSidebar}>
        Login
      </Link>
    </nav>
  );
};
export default AuthLinks;
