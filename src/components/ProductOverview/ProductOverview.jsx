import { useState } from 'react';
import css from './ProductOverview.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';
import   Modal  from "../Modal/Modal";
import ReactModal from '../RegisterModal/RegisterModal'



export const ProductOverview = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowModal(true);
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ReactModal />
      </Modal>
    </>
  );
};
