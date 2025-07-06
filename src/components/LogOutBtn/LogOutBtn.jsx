import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import css from './LogOutBtn.module.css';

import { toast } from 'react-hot-toast';
import { logOutUser } from '../../redux/authSlice/operations';
import { clearCart } from '../../redux/cartSlice/cartSlice';

const LogOutBtn = ({ closeSidebar, isHomePage, isDesktop }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      dispatch(clearCart);
      await dispatch(logOutUser()).unwrap();
      toast.success('You have successfully logged out.');
    } catch (error) {
      toast.error(error || 'Failed to log out. Please try again.');
    } finally {
      if (!isDesktop) {
        closeSidebar();
      }
      navigate('/');
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={handleConfirm}
        className={`${css.button} ${
          isHomePage ? css.buttonHeader : css.buttonHome
        }`}>
        Log out
      </button>
    </>
  );
};

export default LogOutBtn;
