import css from "./FooterNavigationLinks.module.css"

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const links = [
  { to: "/", text: "Home" },
  { to: "/medicine-store", text: "Medicine store" },
  { to: "/medicine", text: "Medicine" },
];

const FooterNavigationLinks = () => {


  return (
    <nav className={css.navLinks}>
      <ul className={css.navLinksList}>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink className={css.link} to={link.to} >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

FooterNavigationLinks.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default FooterNavigationLinks;