import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import css from './AddToCartButton.module.css';
import { updateCartItem } from '../../redux/cartSlice/operation';
import { selectCartItems } from '../../redux/cartSlice/selectors';
import { setOpenRegisterModal } from '../../redux/authSlice/slice';
import { selectIsLoggedIn } from '../../redux/authSlice/selectors';

const AddToCartButton = ({ productId, style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const inCart = items.some(item => {
    return item.productId && item.productId._id === productId;
  });

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setOpenRegisterModal());
      return;
    }
    if (inCart) {
      navigate('/cart-page');
    } else {
      dispatch(updateCartItem({ productId, quantity: 1 }));
    }
  };



  return (
    <button
      type='button'
      aria-label='Add to cart'
      onClick={handleClick}
      className={style}>
      {inCart && isLoggedIn ? 'Item in Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;
