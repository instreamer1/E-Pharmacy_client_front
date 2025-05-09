//tokenService.js

import authInstance from '../api/axios/authInstance';
import { logOutUser, refresh } from '../redux/authSlice/operations';

let store;

// export const getAuthToken = () => {
//     try {
//       const persistedAuth = localStorage.getItem('persist:auth');
//       if (!persistedAuth) return null;

//       const parsed = JSON.parse(persistedAuth);
//       const auth = JSON.parse(parsed.auth || '{}');
//       return auth.accessToken || null;
//     } catch (error) {
//       return null;
//     }
//   };

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

export const tokenService = {
  setStore: reduxStore => {
    store = reduxStore;
  },

  getAccessToken: () => {
    if (!store) return null;
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    console.log(' accessToken', accessToken);
    return accessToken;
  },

  refreshToken: async () => {
    try {
      console.log('Dispatching refresh action...');

      const response = await store.dispatch(refresh()).unwrap();

      console.log('Received refreshed token from store dispatch:', response);

      const newToken = response.accessToken;
      console.log('New token:', newToken);
      return newToken;
    } catch (error) {
      console.error('Failed to refresh token in tokenService:', error);
      throw new Error('Failed to refresh token');
    }
  },

  clearTokensFast: () => {
    if (store) {
      store.dispatch({ type: 'user/logout' });
    }
  },

  clearTokensFull: async () => {
    if (store) {
      try {
        await store.dispatch(logOutUser()).unwrap();
      } catch (error) {
        console.error('Full logout failed. Fallback to fast clear.');
        store.dispatch({ type: 'auth/logout' });
      }
    }
  },
};
