import axios from 'axios';
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

export const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// export const setToken = accessToken => {
//   instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
// };

// export const clearToken = () => {
//   instance.defaults.headers.common.Authorization = '';
// };

// instance.interceptors.request.use(
//   async config => {
//     const state = store.getState();
//     const token = state.auth.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   response => response,
//   async error => handle401Error(error, error.config, instance)
// );
