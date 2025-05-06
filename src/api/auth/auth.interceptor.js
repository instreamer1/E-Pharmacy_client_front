// api/auth/auth.interceptor.js

import { refresh } from "../../redux/authSlice/operations";

let isRefreshing = false;
let failedRequests = [];

export const setupAuthInterceptor = (instance) => {
  instance.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
      
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequests.push({ resolve, reject });
          }).then(() => instance(originalRequest));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refresh();
          
          // Сохраняем новый токен (пример для Redux Persist)
          const authData = JSON.parse(localStorage.getItem('persist:auth') || '{}');
          const authState = JSON.parse(authData.auth || '{}');
          authState.accessToken = newToken;
          localStorage.setItem('persist:auth', JSON.stringify(authData));
          
          // Обновляем заголовок и повторяем запрос
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          // Повторяем все проваленные запросы
          failedRequests.forEach(promise => promise.resolve());
          failedRequests = [];
          
          return instance(originalRequest);
        } catch (refreshError) {
          // Очищаем данные и перенаправляем на логин
          localStorage.removeItem('persist:auth');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      
      return Promise.reject(error);
    }
  );
  return instance;
};