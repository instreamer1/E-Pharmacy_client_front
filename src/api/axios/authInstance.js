// api/axios/authInstance.js

import axios from 'axios';
import { tokenService } from '../../services/tokenService';

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

let isRefreshing = false; // Флаг процесса обновления токена
let pendingRequests = []; // Очередь запросов, ожидающих обновления токена

authInstance.interceptors.request.use(
  config => {
    if (
      !config.url.includes('/auth/register') &&
      !config.url.includes('/auth/login')
    ) {
      const token = tokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    // Если ошибка 401 и это не повторная попытка
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Если уже идет обновление токена, добавляем запрос в очередь
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${tokenService.getAccessToken()}`;
            return authInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await tokenService.refreshToken();
        isRefreshing = false;

        // Обновляем заголовки для оригинального запроса
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // Выполняем все ожидающие запросы с новым токеном
        pendingRequests.forEach(({ resolve }) => resolve());
        pendingRequests = [];

        return authInstance(originalRequest);
      } catch (refreshError) {
        // Очищаем токены при ошибке обновления
        tokenService.clearTokens();

        // Отклоняем все ожидающие запросы
        pendingRequests.forEach(({ reject }) => reject(refreshError));
        pendingRequests = [];
        isRefreshing = false;

        // Перенаправляем на логин (если нужно)
        if (window.location.pathname !== '/login') {
          // window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authInstance;
