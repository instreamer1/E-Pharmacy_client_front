import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';


import InputField from '../../components/InputField/InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import css from './LoginModal.module.css';
import { logInUser } from '../../redux/authSlice/operations';

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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
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
      navigate('/medicine');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className={css.loginPage}>
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
        <button type='submit' disabled={!isValid} className={css.submitBtn}>
          Log In
        </button>
        <Link to='/register' className={css.link}>
          Don’t have an account? Sign up
        </Link>
      </form>
    </section>
  );
};

export default LoginModal;
