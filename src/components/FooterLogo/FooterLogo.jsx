import { Link } from "react-router-dom";
import css from "./FooterLogo.module.css"
import logo from '../../assets/images/logo.svg';


const FooterLogo = () => {
    return (
      <Link to="/">
        <img className={css.logo} src={logo} alt="E-Pharmacy Logo" />
        <span>E-Pharmacy</span>
      </Link>
    );
  };

  export default FooterLogo