import { Link, useNavigate } from 'react-router-dom';
import css from './LoginPage.module.css';
import { useState } from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Logo from '../../components/Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { logInUser } from '../../redux/authSlice/operations';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import LineContainer from '../../components/LineContainer/LineContainer';

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

const LoginPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
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
    const email = data.email.trim();
    const password = data.password.trim();
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
      <div className={css.container}>
        <div className={css.descriptionBlock}>
          <Logo />
          <MainContent />
        </div>
        <div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={css.inputsWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  <input
                    type='email'
                    placeholder='Email address'
                    autoComplete='email'
                    {...register('email')}
                    className={css.registerInput}
                  />
                  {errors.email && (
                    <p className={css.error}>{errors.email.message}</p>
                  )}
                </label>
              </div>

              <div className={css.inputWrapper}>
                <label className={css.label}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    autoComplete='new-password'
                    {...register('password')}
                    className={css.registerInput}
                  />
                </label>

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className={css.eyeButton}>
                  <span className={css.eyeIcon}>
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </button>
                {errors.password && (
                  <p className={css.error}>{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className={css.btnWrapper}>
              <button
                aria-label='Sign up'
                type='submit'
                disabled={!isValid || isSubmitting}
                className={css.submitBtn}>
                {isSubmitting ? ' Log In...' : ' Log In'}
              </button>
            </div>
          </form>
          <div className={css.navWrapper}>
            <Link to='/register' className={css.navLink}>
              Don't have an account?
            </Link>
          </div>
        </div>
      </div>
      <div className={css.lineContainerWrapper}>
        <LineContainer />
      </div>
    </section>
  );
};

export default LoginPage;
