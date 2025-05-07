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
  response => response, // Если ответ успешный - просто пропускаем его
  async error => {
    const originalRequest = error.config;
     console.log("responseStatus", response.status);
    // Если получили 401 ошибку И это не запрос на обновление токена
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Если уже идёт обновление токена
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          // Добавляем запрос в очередь
          failedRequests.push({ resolve, reject });
        }).then(() => {
          // Когда токен обновится - повторяем запрос
          return privateInstance(originalRequest);
        });
      }

      originalRequest._retry = true; // Помечаем запрос как обработанный
      isRefreshing = true; // Начинаем обновление токена

      try {
        // 1. Пытаемся обновить токен
        const { data } = await refresh();
        const newToken = data.accessToken;
        console.log("newToken", newToken);
        // 2. Сохраняем новый токен
        const authData = JSON.parse(localStorage.getItem('persist:auth') || '{}');
        const authState = JSON.parse(authData.auth || '{}');
        authState.accessToken = newToken;
        authData.auth = JSON.stringify(authState);
        localStorage.setItem('persist:auth', JSON.stringify(authData));
        
        // 3. Обновляем заголовок оригинального запроса
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        // 4. Повторяем все запросы из очереди
        failedRequests.forEach(promise => promise.resolve());
        failedRequests = [];
        
        // 5. Повторяем оригинальный запрос
        return privateInstance(originalRequest);
      } catch (refreshError) {
        // Если не удалось обновить токен:
        // - очищаем очередь с ошибкой
        failedRequests.forEach(promise => promise.reject(refreshError));
        failedRequests = [];
        
        // - перенаправляем на страницу входа
        if (window.location.pathname !== '/login') {
          // window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // Снимаем флаг обновления
      }
    }
    
    // Для всех других ошибок просто пробрасываем их дальше
    return Promise.reject(error);
  }
);

export default privateInstance;
