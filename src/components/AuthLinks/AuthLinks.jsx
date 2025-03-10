import { Link } from "react-router-dom";
import css from "./AuthLinks.module.css"

const AuthLinks = () => {
    return (
      <nav className={css.authLinks} >
        <Link to="/register">
          <button className={css.register}>Register</button>
        </Link>
        <Link to="/login">
          <button className={css.login}>Login</button>
        </Link>
      </nav>
    );
  };
  export default AuthLinks