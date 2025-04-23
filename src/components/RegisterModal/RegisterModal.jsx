import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

import { registerUser } from '../../redux/authSlice/operations';
import MainContent from '../MainContent/MainContent';

import InputField from '../InputField/InputField';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import css from './RegisterModal.module.css';
import LoginModal from '../LoginModal/LoginModal';
import Modal from '../Modal/Modal';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      // navigate('/login');
      setShowModal(false)
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  const handleOpenLoginModal = ()=>{
   setShowModal(true)
  }



  return (
    <>
    <section className={css.registerPage}>
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
        {/* <Link to='/login' className={css.navLink}>
          Already have an account?
        </Link> */}

        <button onClick={handleOpenLoginModal}>
    
          Already have an account?
        </button>
      </div>
    </section>
       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
       <LoginModal />
     </Modal>
     </>
  );
};

export default RegisterModal;
