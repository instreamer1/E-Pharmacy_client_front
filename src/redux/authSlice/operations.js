//authSlice/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  register,
  signin,
  logout,
  refreshToken,
  getUserInfo,
} from '../../api/auth.api';
import { normalizeError } from '../../utils/errorHandler';
import { clearAllCookies } from '../../utils/cookieUtils';
import { purgePersistedState } from '../../utils/persistUtils';

export const registerUser = createAsyncThunk(
  'users/signup',
  async (newUser, thunkAPI) => {
    try {
      const response = await register(newUser);
      return response.data;
    } catch (error) {
      const errorMessage = normalizeError(error);
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
      const errorMessage = normalizeError(error);
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

      const errorMessage = normalizeError(error);
      return thunkAPI.rejectWithValue(errorMessage);
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
      return thunkAPI.rejectWithValue(normalizeError(error));
    }
  }
);

let isRefreshing = false;
let refreshPromise = null;

export const refresh = createAsyncThunk('user/refresh', async (_, thunkApi) => {
  try {
    if (isRefreshing && refreshPromise) {
      const { data } = await refreshPromise;
      if (!data?.accessToken) {
        throw new Error('No access token in refresh response');
      }

      return data;
    }

    isRefreshing = true;
    refreshPromise = refreshToken();

    const { data } = await refreshPromise;

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(normalizeError(error));
  } finally {
    isRefreshing = false;
    refreshPromise = null;
  }
});
