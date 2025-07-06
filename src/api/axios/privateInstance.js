// api/axios/privateInstance.js

import axios from 'axios';
import { tokenService } from '../../services/tokenService';

const privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

privateInstance.interceptors.request.use(
  config => {
    if (
      !config.url.includes('/user/signup') &&
      !config.url.includes('/user/signin')
    ) {
      const accessToken = tokenService.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

privateInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(privateInstance(originalRequest));
            },
            reject: err => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await tokenService.refreshToken();

        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return privateInstance(originalRequest); 
      } catch (err) {
        tokenService.clearTokensFast();
        processQueue(err, null);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

   
    return Promise.reject(error);
  }
);

export default privateInstance;