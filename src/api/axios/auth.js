// api/axios/auth.js
import axios from 'axios';

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Отправляем куки для этих запросов
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default authInstance;