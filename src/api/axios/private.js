// api/axios/private.js

import axios from 'axios';

import { refresh } from '../../redux/authSlice/operations';

import { refreshToken } from '../auth/auth.api'; // Убедись, что путь корректный

// Получение токена из localStorage
export const getAuthToken = () => {
  try {
    const persistedAuth = localStorage.getItem('persist:auth');
    if (!persistedAuth) return null;

    const parsed = JSON.parse(persistedAuth);
    const auth = JSON.parse(parsed.auth || '{}');
    return auth.accessToken || null;
  } catch (error) {
    return null;
  }
};

let isRefreshing = false;
let failedRequests = [];

const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

privateInstance.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Обработка 401 и попытка обновить токен
privateInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        }).then(() => privateInstance(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken();
        const newToken = response.data.accessToken;

        // Обновление токена в localStorage
        const rawPersistedAuth = localStorage.getItem('persist:auth') || '{}';
        const parsed = JSON.parse(rawPersistedAuth);
        const auth = JSON.parse(parsed.auth || '{}');
        auth.accessToken = newToken;
        parsed.auth = JSON.stringify(auth);
        localStorage.setItem('persist:auth', JSON.stringify(parsed));

        // Применяем новый токен к запросу
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Повторяем запросы из очереди
        failedRequests.forEach(p => p.resolve());
        failedRequests = [];

        return privateInstance(originalRequest);
      } catch (refreshError) {
        failedRequests.forEach(p => p.reject(refreshError));
        failedRequests = [];

        // Перенаправление на /login при необходимости
        if (window.location.pathname !== '/login') {
          // window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default privateInstance;

