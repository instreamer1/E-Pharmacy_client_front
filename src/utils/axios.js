import axios from 'axios';
import { logOutUser, refresh } from '../redux/authSlice/operations'; // Ваши действия для обновления токена

const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(apiUrl);
export const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Функция для установки токена
export const setToken = accessToken => {
  instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

// Функция для удаления токена
export const clearToken = () => {
  instance.defaults.headers.common.Authorization = '';
};

let isRefreshing = false; // Флаг, указывающий, что токен обновляется
let pendingRequests = []; // Очередь запросов, ожидающих обновления токена

const processQueue = (error, token = null) => {
  pendingRequests.forEach(promise => {
    if (error) {
      promise.reject(error); // Ошибка, если не удалось обновить токен
    } else {
      promise.resolve(token); // Успешное обновление токена
    }
  });

  pendingRequests = []; // Очищаем очередь
};

// Перехватчик запросов для добавления токена

const getToken = () => {
  return localStorage.getItem('authToken'); // Получаем токен из localStorage
};

instance.interceptors.request.use(
  async config => {
    if (
      !config.url.includes('/auth/register') &&
      !config.url.includes('/auth/login')
    ) {
      const token = getToken(); // Получаем токен через getToken
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

// Перехватчик ответов для обработки ошибки 401 и обновления токена
instance.interceptors.response.use(
  response => response, // Если ответ успешный, просто возвращаем его
  async error => {
    const originalRequest = error.config; // Исходный запрос
 // Если токен не обновился, очищаем состояние
    if (
      error.response &&
      error.response.config.url.includes('/auth/refresh') &&
      (error.response.status === 400 || error.response.status === 401)
    ) {
      // Если не удалось обновить токен, разлогиниваем пользователя
      clearToken();

      // Обновляем состояние авторизации в localStorage
      localStorage.setItem('authToken', null);
      localStorage.setItem('isLoggedIn', 'false'); // Убираем информацию о пользователе

      window.localStorage.removeItem('persist:auth'); // Очищаем persist

      return Promise.reject(error);
    }

    // Обрабатываем ошибку 401 для остальных запросов
    if (
      error.response &&
      !error.response.config.url.includes('/auth/refresh') &&
      error.response.status === 401 &&
      !originalRequest._retry // Если еще не пытались обновить токен
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Если токен обновляется, ставим запрос в очередь
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        // Предположим, что refreshToken() - это действие в вашем store
        refresh()
          .then(resultAction => {
            if (resultAction.payload && resultAction.payload.accessToken) {
              setToken(resultAction.payload.accessToken);
              originalRequest.headers.Authorization = `Bearer ${resultAction.payload.accessToken}`;
              processQueue(null, resultAction.payload.accessToken);
              resolve(instance(originalRequest));
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
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error); // Возвращаем ошибку, если не удалось обновить токен
  }
);

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         toast.error('Session expired. Please log in again.');

//          dispatch(logOutUser());
//       }
//     } else {
//       toast.error('Network error. Please try again later.');
//     }
//     return Promise.reject(error);
//   }
// );
