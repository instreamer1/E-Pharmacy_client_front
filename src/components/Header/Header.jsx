import { useLocation } from 'react-router-dom';
import AuthLinks from '../AuthLinks/AuthLinks';
import Logo from '../Logo/Logo';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import css from './Header.module.css';
import {  useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import { useMediaQuery } from 'react-responsive';
import iconSprite from '../../assets/sprite.svg';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' });



  return (
    <header
      className={`${css.header} ${
        isHomePage ? css.homeHeader : css.medicineStoreHeader
      }`}
      role='banner'
      aria-label='Main site title'>
      <div className={css.container}>
        <Logo isHomePage={isHomePage} />
        <div className={css.navLinks}>
          <NavigationLinks />
        </div>
        <div className={css.authLinks}>
          {isDesktop && (
            <AuthLinks isDesktop={isDesktop} isHomePage={isHomePage} />
          )}
        </div>
        <button className={css.menuButton} onClick={() => setIsMenuOpen(true)}>
          <svg
            className={`${css.burger} ${
              isHomePage ? css.burgerWhite : css.burgerGreen
            } `}>
            <use href={`${iconSprite}#burger`}></use>
          </svg>
        </button>
      </div>
      {!isDesktop && (
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
};

export default Header;
