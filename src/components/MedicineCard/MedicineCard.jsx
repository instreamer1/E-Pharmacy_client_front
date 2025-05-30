import { useDispatch, useSelector } from 'react-redux';

import css from './MedicineCard.module.css';
import { selectCartItems } from '../../redux/cartSlice/selectors';
import { useNavigate } from 'react-router-dom';
import { updateCartItem } from '../../redux/cartSlice/operation';
import AddToCartButton from '../AddToCartButton/AddToCartButton';

const MedicineCard = ({ medicine, onupdateCartItem, onDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isInCart = useSelector(selectIsItemInCart(medicine._id));
  const items = useSelector(selectCartItems);
  const inCart = items.some(item => {
    return item.productId && item.productId._id === medicine._id;
  });

  const handleClick = () => {
    if (inCart) {
      navigate('/cart-page');
    } else {
      dispatch(updateCartItem({ productId: medicine._id, quantity: 1 }));
    }
  };

  const style = css.addButton;

  return (
    <li className={css.medicineCard}>
      <div className={css.imgWrapper}>
        <img
          src={medicine.photo || null}
          alt={medicine.name}
          className={css.medicineImage}
        />
      </div>
      <div className={css.infoWrapper}>
        <div className={css.medicineNameBlock}>
          <h3 className={css.medicineName}>{medicine.name}</h3>

          <p className={css.medicinePrice}>
            $
            {
              medicine.price
              //   .toFixed(2)
            }
          </p>
        </div>
        <p className={css.medicineText}>{medicine.suppliers} (Fabrication)</p>
        <div className={css.medicineActions}>
          {/* <button onClick={handleClick} className={css.addButton}>
            {inCart ? 'Item in Cart' : 'Add to Cart'}
          </button> */}

          <AddToCartButton productId={medicine._id} style={style}/>

          <button onClick={onDetails} className={css.detailsButton}>
            Details
          </button>
        </div>
      </div>
    </li>
  );
};

export default MedicineCard;
