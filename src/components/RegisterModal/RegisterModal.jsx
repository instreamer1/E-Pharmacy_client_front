import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { registerUser } from '../../redux/authSlice/operations';

import InputField from '../InputField/InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './RegisterModal.module.css';

// import LoginModal from '../LoginModal/LoginModal';
// import Modal from '../Modal/Modal';
import { setCloseModals, setOpenLoginModal } from '../../redux/authSlice/slice';
import ModalTitle from '../ModalTitle/ModalTitle';
// import {
//   selectIsOpenLoginModal,
//   selectIsOpenRegisterModal,
// } from '../../redux/authSlice/selectors';

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required('Name is required'),
  email: yup.string().email().required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .required('Phone is required'),
  password: yup
    .string()
    .min(7)
    .max(30)
    .matches(/^\S+$/, 'No spaces')
    .required('Password is required'),
});

const RegisterModal = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const isOpenLoginModal = useSelector(selectIsOpenLoginModal);
  // const isOpenRegisterModal = useSelector(selectIsOpenRegisterModal);

  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const togglePassword = () => setShowPassword(prev => !prev);

  const onSubmit = async data => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success('Successfully registered!');
      reset();
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      dispatch(setCloseModals());
    }
  };

  const handleOpenLoginModal = () => {
    dispatch(setCloseModals());
    dispatch(setOpenLoginModal());
  };

  // useEffect(() => {
  //   if (isOpenLoginModal) dispatch(setCloseModals());
  // }, [isOpenLoginModal, dispatch]);

  // if (!isOpenRegisterModal) return null;

  return (
    <section className={css.registerPage}>
      <ModalTitle
        title={'Sign Up'}
        description={'Before proceeding, please register on our site.'}
      />
      <div className={css.container}>
        {/* <div className={css.descriptionBlock}>
       
          <MainContent />
        </div> */}
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={css.inputsWrapper}>
            <InputField
              name='name'
              placeholder='User Name'
              error={errors.name?.message}
              {...register('name')}
            />
            <InputField
              name='email'
              placeholder='Email address'
              error={errors.email?.message}
              {...register('email')}
            />
            <InputField
              name='phone'
              placeholder='Phone number'
              error={errors.phone?.message}
              {...register('phone')}
            />
            <InputField
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              autoComplete='new-password'
              error={errors.password?.message}
              icon={
                showPassword ? (
                  <FiEyeOff onClick={togglePassword} />
                ) : (
                  <FiEye onClick={togglePassword} />
                )
              }
              {...register('password')}
            />
          </div>

          <div className={css.btnWrapper}>
            <button type='submit' disabled={!isValid} className={css.submitBtn}>
              Sign up
            </button>
          </div>
        </form>
      </div>
      <div className={css.navWrapper}>
        <button type='button' onClick={handleOpenLoginModal}>
          Already have an account?
        </button>
      </div>
    </section>
  );
};

export default RegisterModal;
