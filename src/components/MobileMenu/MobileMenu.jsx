import css from './MobileMenu.module.css';
import iconSprite from '../../assets/sprite.svg';
import AuthLinks from '../AuthLinks/AuthLinks';
import NavigationLinks from '../NavigationLinks/NavigationLinks';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`${css.mobileMenu} ${isOpen ? css.open : ''}`}>
      <button className={css.closeButton} onClick={onClose}>
        <svg className={css.closeModal}>
          <use href={`${iconSprite}#closeModal`}></use>
        </svg>
      </button>

      <div className={css.container}>
        <div className={css.navLinks}>
          <NavigationLinks closeSidebar={onClose}/>
        </div>
        <div className={css.authLinks}>
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
