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
