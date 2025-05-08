//api/axios/public.js
import axios from 'axios';



const publicInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false ,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

export default publicInstance;


/**
 * Публичный экземпляр Axios для запросов, не требующих авторизации.
 * Базовые настройки:
 * - Базовый URL из переменных окружения
 * - withCredentials: true для работы с куками (если нужно)
 * - Общие заголовки для JSON-данных
 */
// const publicInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, // Базовый URL API
//   withCredentials: true, // Для отправки/приёма кук (если API использует аутентификацию через куки)
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// Интерцептор для обработки ошибок
// publicInstance.interceptors.response.use(
//   (response) => response.data, // Упрощаем ответ, возвращая только data
//   (error) => {
//     // Стандартизированная обработка ошибок
//     const processedError = handleApiError(error);
//     return Promise.reject(processedError);
//   }
// );

// export default publicInstance;