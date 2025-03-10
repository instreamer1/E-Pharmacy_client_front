import { Link } from 'react-router-dom';
import logoGreen from '../../assets/images/logo.svg';
import logoWhite from '../../assets/images/logo_wite.svg';
import css from './Logo.module.css';

const Logo = ({ isHomePage }) => {
  const logo = isHomePage ? logoWhite : logoGreen;
  const textColor = isHomePage ? css.whiteText : css.greenText;

  return (
    <Link className={css.mainLogo} to='/'>
      <img src={logo} alt='E-Pharmacy Logo' className={css.logo} />
      <span className={`${css.text} ${textColor}`}>E-Pharmacy</span>
    </Link>
  );
};

export default Logo;
