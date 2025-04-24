// AuthModalSwitcher.jsx

import { useSelector, useDispatch } from 'react-redux';

import Modal from '../Modal/Modal';
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import {
  selectIsOpenLoginModal,
  selectIsOpenRegisterModal,
} from '../../redux/authSlice/selectors';
import { setCloseModals } from '../../redux/authSlice/slice';

const AuthModalSwitcher = () => {
  const dispatch = useDispatch();
  const isOpenLoginModal = useSelector(selectIsOpenLoginModal);
  const isOpenRegisterModal = useSelector(selectIsOpenRegisterModal);

  const handleClose = () => {
    dispatch(setCloseModals());
  };

  return (
    <>
      <Modal isOpen={isOpenLoginModal} onClose={handleClose}>
        <LoginModal />
      </Modal>
      <Modal isOpen={isOpenRegisterModal} onClose={handleClose}>
        <RegisterModal />
      </Modal>
    </>
  );
};

export default AuthModalSwitcher;
