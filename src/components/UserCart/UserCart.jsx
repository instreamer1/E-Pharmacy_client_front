import css from './UserCart.module.css';
import LogOutBtn from '../LogOutBtn/LogOutBtn';
import iconSprite from '../../assets/sprite.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';
import { selectCartItemCount } from '../../redux/cartSlice/selectors';

const UserCart = ({ closeSidebar, isDesktop, isHomePage }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItemsCount = useSelector(selectCartItemCount);
  const name = 'bbbb bbbbb bbb';
  const getInitial = name => {
    if (!name) return '';
    return name.trim()[0].toUpperCase();
  };

  return (
    <div className={css.userCart}>
      <Link to='/cart-page' aria-label='Shopping cart' className={css.cartLink}>
        <svg
          className={`${css.cartIcon} ${isHomePage ? css.cartIconHome : ''}`}
          aria-hidden='true'
          focusable='false'>
          <use href={`${iconSprite}#icon-shopping-cart`}></use>
        </svg>
        {cartItemsCount > 0 && (
          <span className={css.cartBadge} aria-hidden='true'>
            {cartItemsCount}
          </span>
        )}
      </Link>
      <div className={css.user}>
        <p className={css.userIndex}> {getInitial(name)}</p>
      </div>
      {isDesktop && (
        <LogOutBtn
          closeSidebar={closeSidebar}
          isDesktop={isDesktop}
          isHomePage={isHomePage}
        />
      )}
    </div>
  );
};

export default UserCart;
