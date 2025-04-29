import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';

import { logInUser } from '../../redux/authSlice/operations';
import {
  setCloseModals,
  setOpenRegisterModal,
} from '../../redux/authSlice/slice';

import InputField from '../../components/InputField/InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './LoginModal.module.css';
import ModalTitle from '../ModalTitle/ModalTitle';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Enter a valid Email'
    )
    .required('Email is required!'),
  password: yup
    .string()
    .min(7, 'Password must contain at least 7 characters!')
    .max(30, 'Password must be no more than 30 characters')
    .matches(/^\S+$/, 'Password cannot contain spaces')
    .required('Password is required!'),
});

const LoginModal = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    const { email, password } = data;
    try {
      await dispatch(logInUser({ email, password })).unwrap();
      toast.success('User registered successfully!');
      reset();
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setCloseModals());
    }
  };

  const handleOpenRegisterModal = () => {
    dispatch(setCloseModals());
    dispatch(setOpenRegisterModal());
  };

  return (
    <section className={css.loginPage}>
      <div className={css.container}>
        <ModalTitle
          title={'Log in to your account'}
          description={'Please login to your account before continuing.'}
        />
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <InputField
            name='email'
            placeholder='Email address'
            error={errors.email?.message}
            {...register('email')}
          />
          <InputField
            name='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            error={errors.password?.message}
            icon={
              showPassword ? (
                <FiEyeOff onClick={() => setShowPassword(false)} />
              ) : (
                <FiEye onClick={() => setShowPassword(true)} />
              )
            }
            {...register('password')}
          />
          <button
            type='submit'
            disabled={!isValid || isSubmitting}
            className={css.submitBtn}>
            {isSubmitting ? ' Log In...' : ' Log In'}
          </button>
        </form>
      </div>
      <div className={css.navWrapper}>
        <button
          className={css.navLink}
          type='button'
          onClick={handleOpenRegisterModal}>
          Don’t have an account?
        </button>
      </div>
    </section>
  );
};

export default LoginModal;
