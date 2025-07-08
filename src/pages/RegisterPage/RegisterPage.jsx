import { Link, useNavigate } from 'react-router-dom';
import MainContent from '../../components/MainContent/MainContent';
import LineContainer from '../../components/LineContainer/LineContainer';
import css from './RegisterPage.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../redux/authSlice/operations';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import { normalizePhoneNumber } from '../../utils/normalizePhoneNumber';

const registrationSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required!'),
  email: yup
    .string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Enter a valid Email'
    )
    .required('Email is required!'),
  phone: yup
    .string()
    .matches(
      /^\+38 \(0\d{2}\) \d{3}-\d{2}-\d{2}$/,
      'Invalid phone format +38 (011) 111-11-11'
    )
    .required('Phone is required'),
  password: yup
    .string()
    .min(7, 'Password must contain at least 7 characters!')
    .max(30, 'Password must be no more than 30 characters')
    .matches(/^\S+$/, 'Password cannot contain spaces')
    .required('Password is required!'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    const name = data.name.trim();
    const email = data.email.trim();
    const phone = normalizePhoneNumber(data.phone);
    const password = data.password.trim();
    try {
      await dispatch(registerUser({ name, email, phone, password })).unwrap();
      toast.success('User registered successfully!');
      reset();
      navigate('/login');
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className={css.registerPage}>
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
                    type='text'
                    placeholder='User Name'
                    autoComplete='name'
                    {...register('name')}
                    className={css.registerInput}
                  />
                  {errors.name && (
                    <p className={css.error}>{errors.name.message}</p>
                  )}
                </label>
              </div>

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

              <PhoneInput
                name='phone'
                placeholder='Phone number'
                register={register('phone')}
                error={errors.phone?.message}
                inputWrapper={css.inputWrapper}
              />

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
                {isSubmitting ? 'Signing up...' : 'Sign up'}
              </button>
            </div>
          </form>
          <div className={css.navWrapper}>
            <Link to='/login' className={css.navLink}>
              Already have an account?
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

export default RegisterPage;
