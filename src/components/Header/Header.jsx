import { useLocation } from 'react-router-dom';
import AuthLinks from '../AuthLinks/AuthLinks';
import Logo from '../Logo/Logo';
import NavigationLinks from '../NavigationLinks/NavigationLinks';
import css from './Header.module.css';
import { useEffect, useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import iconSprite from '../../assets/sprite.svg';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Функция для закрытия меню при увеличении экрана
  const handleResize = () => {
    if (window.innerWidth >= 1440) {
      setIsMenuOpen(false); // Закрыть меню на десктопной версии
    }
  };

  // Отслеживание изменения размера окна
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Очистка слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <AuthLinks />
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
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};

export default Header;
