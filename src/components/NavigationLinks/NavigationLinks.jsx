import css from "./NavigationLinks.module.css"

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const links = [
  { to: "/", text: "Home" },
  { to: "/medicine-store", text: "Medicine store" },
  { to: "/medicine", text: "Medicine" },
];

const NavigationLinks = ({ closeSidebar }) => {
  const buildLinkClass = ({ isActive }) => {
    return `${css.link} ${isActive ? css.active : ""}`;
  };

  return (
    <nav className={css.navLinks}>
      <ul className={css.navLinksList}>
        {links.map((link, index) => (
          <li key={index}>
            <NavLink className={buildLinkClass} to={link.to} onClick={closeSidebar}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavigationLinks.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
};

export default NavigationLinks;