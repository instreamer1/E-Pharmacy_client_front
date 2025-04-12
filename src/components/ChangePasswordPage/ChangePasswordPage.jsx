import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import css from'./ChangePasswordPage.module.css'; 

const ChangePasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/users/change-password', {
        password,
        token,
      }, { withCredentials: true });

      setMessage('Password successfully changed!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className={css.changePasswordContainer}>
      <div className={css.changePasswordForm}>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className={css.inputGroup}>
            <input
            className={css.input}
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={css.submitBtn}>Change password</button>
        </form>
        {message && <p className={css.message}>{message}</p>}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
