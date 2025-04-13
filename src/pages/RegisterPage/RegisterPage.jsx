import { Link, useNavigate } from 'react-router-dom';
import MainContent from '../../components/MainContent/MainContent';
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
import LineContainer from '../../components/lineContainer/lineContainer';

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
    .matches(/^\+?[1-9]\d{1,14}$/, 'Enter a valid Phone')
    .required('Phone is required!'),
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
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    const { name, email, phone, password } = data;
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
              <div className={css.inputWrapper}>
                <label className={css.label}>
                  <input
                    type='tel'
                    placeholder='Phone number'
                    autoComplete='tel'
                    {...register('phone')}
                    className={css.registerInput}
                  />
                  {errors.phone && (
                    <p className={css.error}>{errors.phone.message}</p>
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
                disabled={!isValid}
                className={css.submitBtn}>
                Sign up
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

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Стили для уведомлений
// import axios from 'axios'; // Или другой HTTP-клиент

// const RegistrationPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState(null); // Состояние для ошибки
//   const navigate = useNavigate(); // Хук для навигации

//   // Обработчик изменения полей формы
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Обработчик отправки формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Отправка данных на бэкенд
//       const response = await axios.post('/api/register', formData);

//       // Если регистрация успешна
//       if (response.status === 201) {
//         toast.success('Регистрация прошла успешно!'); // Уведомление об успехе
//         navigate('/login'); // Перенаправление на страницу входа
//       }
//     } catch (err) {
//       // Обработка ошибки
//       setError(err.response?.data?.message || 'Произошла ошибка при регистрации');
//       toast.error(error); // Показ уведомления с ошибкой
//     }
//   };

//   return (
//     <div>
//       <h2>Регистрация</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Имя пользователя:</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Пароль:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Зарегистрироваться</button>
//       </form>

//       {/* Компонент для отображения уведомлений */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default RegistrationPage;
