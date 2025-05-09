// api/axios/privateInstance.js

import axios from 'axios';
import { tokenService } from '../../services/tokenService';

const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // timeout: 10000,
});

let isRefreshing = false; // Флаг процесса обновления токена
let pendingRequests = []; // Очередь запросов, ожидающих обновления токена

privateInstance.interceptors.request.use(
  config => {
console.log('Intercepted request error:', "Intercepted request error...");

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

privateInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    console.log('Intercepted response error:', error.response?.status);

    if ((error.response.status === 400 ||error.response?.status === 401) && !originalRequest._retry) {
      console.log('[privateInstance] 401 error - attempting to refresh token');

      if (isRefreshing) {
        console.log('[privateInstance] Token is being refreshed. Adding to pending requests.');
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
          .then(() => {
             console.log('[privateInstance] originalRequest.headers', tokenService.getAccessToken());
            originalRequest.headers.Authorization = `Bearer ${tokenService.getAccessToken()}`;
            return privateInstance(originalRequest);
          })
          .catch(err => {
            console.error('[privateInstance] Error while retrying request after token refresh:', err);
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('[privateInstance] Trying to refresh token...');
        const newToken = await tokenService.refreshToken();
         console.log('[privateInstance] refresh response newToken}...', newToken );
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        pendingRequests.forEach(({ resolve }) => resolve());
        pendingRequests = [];

        return privateInstance(originalRequest);
      } catch (refreshError) {
        console.error('[privateInstance] Failed to refresh token:', refreshError);
        tokenService.clearTokens();
        pendingRequests.forEach(({ reject }) => reject(refreshError));
        pendingRequests = [];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
export default privateInstance;