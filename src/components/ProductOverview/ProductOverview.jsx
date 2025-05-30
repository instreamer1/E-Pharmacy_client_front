import { useState } from 'react';
import css from './ProductOverview.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';
import { setOpenRegisterModal } from '../../redux/authSlice/slice';
import iconSprite from '../../assets/sprite.svg';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { updateCartItem } from '../../redux/cartSlice/operation';
import { selectCartItems } from '../../redux/cartSlice/selectors';

export const ProductOverview = ({ product }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find(item => item.productId._id === product._id);

  const handleIncrement = () => {
    const quantity = cartItem ? cartItem.quantity + 1 : 1;
    console.log("quantity", quantity);
    dispatch(updateCartItem({ productId: product._id, quantity }));
  };

  const handleDecrement = () => {
    if (!cartItem) return;

    if (cartItem.quantity > 0) {
      dispatch(
        updateCartItem({
          productId: product._id,
          quantity: cartItem.quantity - 1,
        })
      );
    } else {
      // Можно: либо quantity = 0, либо отдельный remove
      // dispatch(removeFromCart(product.id));
    }
  };

  const style = css.updateCartItem;
  return (
    <>
      <div className={css.medicineCard}>
        <div className={css.imgWrapper}>
          <img
            src={product.photo || null}
            alt={product.name}
            className={css.medicineImage}
          />
        </div>
        <div className={css.infoWrapper}>
          <div className={css.medicineNameBlock}>
            <h3 className={css.name}>{product.name}</h3>

            <p className={css.medicinePrice}>${product.price}</p>
            <p className={css.brand}>Brand: {product.suppliers}</p>
          </div>

          <div className={css.controls}>
            <div className={css.cart}>
              <button
                className={css.buttonQuantity}
                type='button'
                aria-label='increase'
                onClick={handleIncrement}>
                <svg className={css.increase}>
                  <use href={`${iconSprite}#icon-plus`}></use>
                </svg>
              </button>
              <span className={css.quantity}>
                {cartItem ? cartItem.quantity : 1}
              </span>
              <button
                className={css.buttonQuantity}
                type='button'
                aria-label='decrease'
                onClick={handleDecrement}>
                <svg className={css.increase}>
                  <use href={`${iconSprite}#icon-minus`}></use>
                </svg>
              </button>
            </div>
            {/* <button
              type='button'
              aria-label='Add to cart'
              onClick={handleupdateCartItem}
              className={css.updateCartItem}>
              Add to cart
            </button> */}
            <AddToCartButton productId={product._id} style={style} />
          </div>
        </div>
      </div>
    </>
  );
};
