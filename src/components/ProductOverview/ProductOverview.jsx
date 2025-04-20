import { useState } from 'react';
import css from './ProductOverview.module.css';

export const ProductOverview = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // const isAuthorized = Boolean(localStorage.getItem('token')); // пример проверки
    // if (!isAuthorized) {
    //   alert('Please log in to add items to the cart.');
    //   return;
    // }
    // добавить в корзину
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };

  return (
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
        <div className={css.priceRating}>
          {/* <span className={css.rating}>⭐ {product.rating}</span> */}
        </div>
        <div className={css.controls}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
          <button onClick={handleAddToCart} className={css.addToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
