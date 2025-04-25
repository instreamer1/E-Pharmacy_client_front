import { useState } from 'react';
import css from './ProductOverview.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';
import { setOpenRegisterModal } from '../../redux/authSlice/slice';
import iconSprite from '../../assets/sprite.svg';

export const ProductOverview = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      dispatch(setOpenRegisterModal());
      return;
    }
    // dispatch(addToCart(product));
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  return (
    <>
      <div className={css.medicineCard}>
        <div className={css.imgWrapper}>
          <img
            src={product.photo || '/default-medicine.jpg'}
            alt={product.name}
            className={css.medicineImage}
          />
        </div>
        <div className={css.infoWrapper}>
          <div className={css.medicineNameBlock}>
            <h3 className={css.name}>{product.name}</h3>

            <p className={css.medicinePrice}>
              $
              {
                product.price
                //   .toFixed(2)
              }
            </p>
          </div>
          <p className={css.brand}>Brand: {product.suppliers}</p>

          <div className={css.controls}>
            <div className={css.cart}>
              <button
                className={css.buttonQuantity}
                type='button'
                aria-label='decrease'
                onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <svg className={css.increase}>
                  <use href={`${iconSprite}#icon-minus`}></use>
                </svg>
              </button>
              <span className={css.quantity}>{quantity}</span>
              <button
                className={css.buttonQuantity}
                type='button'
                aria-label='increase'
                onClick={() => setQuantity(quantity + 1)}>
                <svg className={css.increase}>
                  <use href={`${iconSprite}#icon-plus`}></use>
                </svg>
              </button>
            </div>
            <button
              type='button'
              aria-label='Add to cart'
              onClick={handleAddToCart}
              className={css.addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
