// api/axios/private.js

import axios from 'axios';
import { refresh } from '../../redux/authSlice/operations';


export const getAuthToken = () => {
  try {
    const persistedAuth = localStorage.getItem('persist:auth');
    if (!persistedAuth) return null;

    const parsed = JSON.parse(persistedAuth);
    return JSON.parse(parsed.accessToken); // теперь вернёт без лишних кавычек
  } catch (error) {
    return null;
  }
};


// Переменные для управления очередью запросов
let isRefreshing = false; // Флаг: идёт ли обновление токена
let failedRequests = []; // Очередь запросов, ожидающих обновления токена

// Создаём экземпляр axios для приватных запросов
const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Интерцептор для добавления токена в заголовки
privateInstance.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки 401 ошибок
privateInstance.interceptors.response.use(
  response => response,
  async error => {
    // Добавляем лог для диагностики
    console.log('Interceptor error:', error);
    
    // Проверяем, что это действительно ошибка от axios
    if (!error.config || !error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    
    // Логируем статус ошибки
    console.log("Response status:", error.response.status);
    
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('401 detected, attempting token refresh...');
      
      if (isRefreshing) {
        console.log('Refresh already in progress, queuing request...');
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then(() => privateInstance(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Refreshing token...');
        const { data } = await refresh();
        const newToken = data.accessToken;
        console.log("New token received:", newToken);

        // Обновляем токен в хранилище
        try {
          const authData = JSON.parse(localStorage.getItem('persist:auth') || '{}';
          const authState = authData.auth ? JSON.parse(authData.auth) : {};
          authState.accessToken = newToken;
          localStorage.setItem(
            'persist:auth',
            JSON.stringify({ ...authData, auth: JSON.stringify(authState) })
          );
        } catch (e) {
          console.error('Error updating auth in localStorage:', e);
        }

        // Обновляем заголовок
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // Повторяем запросы из очереди
        console.log('Processing', failedRequests.length, 'queued requests');
        failedRequests.forEach(promise => promise.resolve());
        failedRequests = [];
        
        return privateInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        
        // Очищаем очередь с ошибкой
        failedRequests.forEach(promise => promise.reject(refreshError));
        failedRequests = [];
        
        // Перенаправляем на логин
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
