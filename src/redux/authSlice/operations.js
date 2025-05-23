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
      await logout();

      clearAllCookies();

      await purgePersistedState();

      thunkAPI.dispatch({ type: 'RESET_STATE' });

      localStorage.clear();
      sessionStorage.clear();

      return null;
    } catch (error) {
      
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
      refreshPromise = refreshToken(); 
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error));
    }
  }
);