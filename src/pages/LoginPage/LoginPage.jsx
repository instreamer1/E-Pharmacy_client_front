import { Link, useNavigate } from 'react-router-dom';
import css from './LoginPage.module.css';
import { useState } from 'react';
import MainContent from '../../components/MainContent/MainContent';
import Logo from '../../components/Logo/Logo';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Валидация формы
    if (!formData.email || !formData.password) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    try {
      // Отправка данных на бэкенд
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Ошибка входа');
      }

      // Успешная авторизация
      navigate('/'); // Перенаправление на главную страницу
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className={css.loginPage}>
          <Logo />
          <p> заголовок з логотипом "E-Pharmacy".</p>
      <MainContent  />

      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Log in</button>
        <p>
          Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
