import axios from 'axios';
import { refreshToken } from '../redux/authSlice/operations'; // Ваши действия для обновления токена
// import { store } from '../redux/store';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// ========== PUBLIC INSTANCE (без cookies) ==========
export const publicInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// ========== PROTECTED INSTANCE (с cookies и токеном) ==========
export const protectedInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// export const instance = axios.create({
//   baseURL: apiUrl,
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// Функция для установки токена
// export const setToken = accessToken => {
//   instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// };

export const getToken = () => {
  try {
    const persistedAuth = localStorage.getItem('persist:auth');
    if (!persistedAuth) return null;

    const parsed = JSON.parse(persistedAuth);
    return JSON.parse(parsed.accessToken); // теперь вернёт без лишних кавычек
  } catch (error) {
    return null;
  }
};

// Функция для удаления токена
export const clearToken = () => {
  delete protectedInstance.defaults.headers.common.Authorization;
};

// ========== RESPONSE INTERCEPTOR WITH TOKEN REFRESH ==========
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
//////////////////////////////////////////////////////////

// Перехватчик запросов для добавления токена
// 👉 Добавляем токен в заголовок каждого запроса
// protectedInstance.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 🔁 Интерцептор ответа
// protectedInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Если токен просрочен и запрос ещё не повторялся
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await publicInstance.get('/users/refresh', {
//           withCredentials: true, // нужен, чтобы refreshToken отправился как httpOnly cookie
//         });

//         const newAccessToken = res.data.accessToken;
//         setToken(newAccessToken);

//         // обновим заголовок и повторим исходный запрос
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return protectedInstance(originalRequest);
//       } catch (refreshError) {
//         // Refresh не сработал — редирект на логин или обработка ошибки
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

/////////////////////////////////////////////////////////////////////
// const refreshToken = async () => {
//   const res = await publicInstance.get('/users/refresh', { withCredentials: true });
//   return res.data.accessToken;
// };

// ========== REQUEST INTERCEPTOR ==========
protectedInstance.interceptors.request.use(
  async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Перехватчик ответов для обработки ошибки 401 и обновления токена
protectedInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/users/refresh')
    ) {
      originalRequest._retry = true;

      try {
        console.log("Dispatching refreshToken thunk...");
        const result = await store.dispatch(refreshToken());

        if (refreshToken.fulfilled.match(result)) {
          const accessToken = result.payload.accessToken;
          console.log("Got new token:", accessToken);

          protectedInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return protectedInstance(originalRequest); // retry
        }

        // Если не получилось обновить
        return Promise.reject(result.payload || error);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);





//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           pendingRequests.push({ resolve, reject });
//         }).then(token => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return protectedInstance(originalRequest);
//         });
//       }

//       isRefreshing = true;

//       return new Promise((resolve, reject) => {
//         refreshToken()
//           .then(newAccessToken => {
//             if (!newAccessToken) {
//               clearToken();
//               processQueue('No token returned', null);
//               reject('No token returned');
//               return;
//             }

//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             processQueue(null, newAccessToken);
//             resolve(protectedInstance(originalRequest));
//           })
//           .catch(refreshError => {
//             clearToken();
//             localStorage.removeItem('persist:auth');
//             processQueue(refreshError, null);
//             reject(refreshError);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       originalRequest.url.includes('/users/refresh')
//     ) {
//       clearToken();
//       localStorage.removeItem('persist:auth');
//     }

//     return Promise.reject(error);
//   }
// );

///////////////////////////////////////////////////////////////////////////////////////////

// protectedInstance.interceptors.request.use(
//   async config => {
//     if (
//       !config.url.includes('/auth/register') &&
//       !config.url.includes('/auth/login')
//     ) {
//       const token = getToken(); // Получаем токен через getToken
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

// // Перехватчик ответов для обработки ошибки 401 и обновления токена
// protectedInstance.interceptors.response.use(
//   response => response, // Если ответ успешный, просто возвращаем его
//   async error => {
//     const originalRequest = error.config; // Исходный запрос
//     // Если токен не обновился, очищаем состояние
//     if (
//       error.response &&
//       error.response.config.url.includes('/users/refresh') &&
//       (error.response.status === 400 || error.response.status === 401)
//     ) {
//       // Если не удалось обновить токен, разлогиниваем пользователя
//       clearToken();

//       // Обновляем состояние авторизации в localStorage
//       localStorage.setItem('accessToken', null);
//       localStorage.setItem('isLoggedIn', 'false'); // Убираем информацию о пользователе

//       window.localStorage.removeItem('persist:auth'); // Очищаем persist

//       return Promise.reject(error);
//     }

//     // Обрабатываем ошибку 401 для остальных запросов
//     if (
//       error.response &&
//       !error.response.config.url.includes('/users/refresh') &&
//       error.response.status === 401 &&
//       !originalRequest._retry // Если еще не пытались обновить токен
//     ) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         // Если токен обновляется, ставим запрос в очередь
//         return new Promise((resolve, reject) => {
//           pendingRequests.push({ resolve, reject });
//         })
//           .then(token => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return instance(originalRequest);
//           })
//           .catch(err => {
//             return Promise.reject(err);
//           });
//       }

//       isRefreshing = true;

//       return new Promise((resolve, reject) => {
//         // Предположим, что refreshToken() - это действие в вашем store
//         refreshToken()
//           .then(newAccessToken => {
//             if (newAccessToken) {
//               setToken(newAccessToken);
//               originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//               processQueue(null, newAccessToken);
//               resolve(protectedInstance(originalRequest));
//             } else {
//               clearToken();
//               processQueue('No access token returned', null);
//               reject('No access token returned');
//             }
//           })
//           .catch(refreshError => {
//             clearToken();
//             processQueue(refreshError, null);
//             reject(refreshError);
//           })
//           .finally(() => {
//             isRefreshing = false;
//           });
//       });
//     }

//     return Promise.reject(error); // Возвращаем ошибку, если не удалось обновить токен
//   }
// );

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
