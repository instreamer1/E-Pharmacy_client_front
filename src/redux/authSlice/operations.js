//authSlice/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  register,
  signin,
  logout,
  refreshToken,
  getUserInfo,
} from '../../api/auth.api';
import { handleAxiosError } from '../../utils/errorUtils';
import { clearAllCookies } from '../../utils/cookieUtils';
import { purgePersistedState } from '../../utils/persistUtils';

console.log('Loading operations.js');

export const registerUser = createAsyncThunk(
  'users/signup',
  async (newUser, thunkAPI) => {
    try {
      const response = await register(newUser);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logInUser = createAsyncThunk(
  'users/signin',
  async (credentials, thunkAPI) => {
    try {
      const response = await signin(credentials);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'users/logout',
  async (_, thunkAPI) => {
    try {
      // 1. Серверный logout
      await logout();

      // 2. Очистка кук
      clearAllCookies();

      // 3. Очистка persisted state
      await purgePersistedState();

      // 4. Сброс Redux состояния
      thunkAPI.dispatch({ type: 'RESET_STATE' });

      // 5. Дополнительная очистка (опционально)
      localStorage.clear();
      sessionStorage.clear();

      return null;
    } catch (error) {
      // Принудительная очистка даже при ошибке
      clearAllCookies();
      await purgePersistedState();
      thunkAPI.dispatch({ type: 'RESET_STATE' });

      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

let isRefreshing = false;
let refreshPromise = null;

export const refresh = createAsyncThunk(
  'user/refresh',
  async (_, thunkApi) => {
    console.log('Start refreshing token...');
    
    try {
      if (isRefreshing && refreshPromise) {
        console.log('Using existing refresh promise');
        const { data } = await refreshPromise;
        return data;
      }

      isRefreshing = true;
      refreshPromise = refreshToken(); // здесь запрос на обновление токена
      console.log('Refreshing token...');
      
      const { data } = await refreshPromise;
      console.log('Received refreshed token:', data);

      return data;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return thunkApi.rejectWithValue(error.message);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  }
);

export const getUser = createAsyncThunk(
  'users/user-info',
  async (_, thunkAPI) => {
    try {
      const response = await getUserInfo();
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// export const refresh = createAsyncThunk(
//   'users/refresh',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await refreshToken();
//       console.log('Refreshing', data);
//       return data;
//     } catch (error) {
//       const errorMessage = handleAxiosError(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );
