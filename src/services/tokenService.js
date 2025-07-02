//tokenService.js

import { logOutUser, refresh } from '../redux/authSlice/operations';

let store;

export const tokenService = {
  setStore: reduxStore => {
    store = reduxStore;
  },
  getAccessToken() {
    if (store) {
      return store.getState().auth.accessToken;
    }

    try {
      const persistedAuth = localStorage.getItem('persist:auth');
      if (!persistedAuth) return null;
      const parsed = JSON.parse(persistedAuth);
      return JSON.parse(parsed.accessToken);
    } catch {
      return null;
    }
  },

 

  refreshToken: async () => {
    console.log('🔄 Refreshing token...');

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
  clearTokensFast() {
    if (store) {
      store.dispatch(logOutUser());
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