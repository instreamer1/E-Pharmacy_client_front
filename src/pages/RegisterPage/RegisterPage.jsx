import { Link, useNavigate } from 'react-router-dom';
import MainContent from '../../components/MainContent/MainContent';
import css from './RegisterPage.module.css';
import logo from '../../assets/images/logo.svg'; 
import { useState } from 'react';
import Logo from '../../components/Logo/Logo';

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
      const [error, setError] = useState(null);
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        // Валидация формы
        if (!formData.name || !formData.email || !formData.password) {
          setError('Все поля обязательны для заполнения');
          return;
        }
    
        try {
          // Отправка данных на бэкенд
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Ошибка регистрации');
          }
    
          // Успешная регистрация
          navigate('/login'); // Перенаправление на страницу входа
        } catch (err) {
          setError(err.message);
        }
      };


  return (
    <section className={css.registerPage}>
     <Logo />
      <p> заголовок з логотипом "E-Pharmacy".</p>
      <MainContent  />

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Имя'
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Пароль'
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p className='error'>{error}</p>}
        <button type='submit'>Register</button>
        <p>
          Уже есть аккаунт? <Link to='/login'>Войти</Link>
        </p>
      </form>
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
