import css from './MobileMenu.module.css';
import iconSprite from '../../assets/sprite.svg';
import AuthLinks from '../AuthLinks/AuthLinks';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';
import LogOutBtn from '../LogOutBtn/LogOutBtn';

const MobileMenu = ({ isOpen, onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={`${css.mobileMenu} ${isOpen ? css.open : ''}`}>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.closeModal}>
          <use href={`${iconSprite}#closeModal`}></use>
        </svg>
      </button>

      <div className={css.container}>
        <div className={css.navLinks}>
          <NavigationLinks closeSidebar={onClose} />
        </div>
        <div className={css.authLinks}>
          {isLoggedIn ? (
            <LogOutBtn closeSidebar={onClose} />
          ) : (
            <AuthLinks closeSidebar={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
