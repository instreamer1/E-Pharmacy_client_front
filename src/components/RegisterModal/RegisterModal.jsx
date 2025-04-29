import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { registerUser } from '../../redux/authSlice/operations';

import InputField from '../InputField/InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './RegisterModal.module.css';
import { setCloseModals, setOpenLoginModal } from '../../redux/authSlice/slice';
import ModalTitle from '../ModalTitle/ModalTitle';

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
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

  return (
    <section className={css.registerPage}>
      <div className={css.container}>
        <ModalTitle
          title={'Sign Up'}
          description={'Before proceeding, please register on our site.'}
        />

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
            <button
              type='submit'
              disabled={!isValid || isSubmitting}
              className={css.submitBtn}>
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
      <div className={css.navWrapper}>
        <button
          className={css.navLink}
          type='button'
          onClick={handleOpenLoginModal}>
          Already have an account?
        </button>
      </div>
    </section>
  );
};

export default RegisterModal;
