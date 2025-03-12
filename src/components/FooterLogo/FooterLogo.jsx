import { Link } from "react-router-dom";
import css from "./FooterLogo.module.css"
import logoWhite from '../../assets/images/logo_wite.svg';


const FooterLogo = () => {
    return (
    <Link className={css.mainLogo} to='/'>
      <img src={logoWhite} alt='E-Pharmacy Logo' className={css.logo} />
      <span className={css.text}>E-Pharmacy</span>
    </Link>
  );
  };

  export default FooterLogo