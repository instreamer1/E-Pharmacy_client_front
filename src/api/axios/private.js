// api/axios/private.js

import axios from 'axios';
import { store } from '../../redux/store';
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
// Создание axios-инстанса
const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

// Установка токена
const setToken = token => {
  privateInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Очистка токена
const clearToken = () => {
  delete privateInstance.defaults.headers.common.Authorization;
};

// Флаги и очередь запросов
let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, token = null) => {
  pendingRequests.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  pendingRequests = [];
};

// privateInstance.interceptors.request.use(
//   async config => {
//     if (!config.url.includes('/auth/register') && !config.url.includes('/auth/login')) {
//       const state = store.getState();
//       const token = state.auth.accessToken;
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

privateInstance.interceptors.request.use(
  config => {
    const publicRoutes = ['/auth/register', '/auth/login'];
    const isPublic = publicRoutes.some(route => config.url.includes(route));

    if (!isPublic) {
      const state = store.getState();
      const token = state.auth.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);








// Response interceptor: обновление токена при 401
privateInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
  // Если получили 401 ошибку И это не запрос на обновление токена
    if (
      error.response &&
      error.response.config.url.includes('/auth/refresh') &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      clearToken();
      // const state = store.getState();
      // state.auth.accessToken = null;
      // state.auth.isLoggedIn = false;
      // localStorage.removeItem('persist:auth');
      window.localStorage.removeItem('persist:auth');
      return Promise.reject(error);
    }
 // 401 и не /refresh — нужно попробовать обновить токен
    if (
      error.response &&
      !error.response.config.url.includes('/auth/refresh') &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return privateInstance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        store.dispatch(refresh()).then(resultAction => {
          if (refresh.fulfilled.match(resultAction)) {
            setToken(resultAction.payload.accessToken);
            originalRequest.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
            processQueue(null, resultAction.payload.accessToken);
            resolve(privateInstance(originalRequest));
          } else {
            clearToken();
            processQueue(resultAction.payload, null);
            reject(resultAction.payload);
          }
        })
        .catch(refreshError => {
          clearToken();
          processQueue(refreshError, null);
          reject(refreshError);
          
          if (window.location.pathname !== '/login') {
            // window.location.href = '/login';
          }
        })
        .finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  }
);

export default privateInstance;
