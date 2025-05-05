import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleAxiosError } from '../../utils/errorUtils';

import { clearToken, instance, setToken } from '../../utils/axios';

export const registerUser = createAsyncThunk(
  'users/signup',
  async (newUser, thunkAPI) => {
    console.log('newUser', newUser);
    try {
      const response = await instance.post('/users/signup', newUser);
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
      const response = await instance.post('/users/signin', credentials);
      setToken(response.data.accessToken);
      console.log(response.data);
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

    console.log('Access token before logout:', localStorage.getItem('accessToken'));
    try {
      await instance.post('/users/logout');
      clearToken();
      localStorage.removeItem('persist:auth');
     
      // return { message: 'Logged out successfully' };
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// export const refreshToken = createAsyncThunk(
//   'users/refresh',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await instance.post('/users/refresh');
//       return data.data;
//     } catch (error) {
//       const errorMessage = handleAxiosError(error);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

export const refreshToken = createAsyncThunk(
  'users/refresh',
  async (_, thunkAPI) => {
    try {
      const response = await instance.post(
        '/users/refresh',
        {},
        { withCredentials: true } // <--- включаем только здесь
      );

      const accessToken = response.data?.data?.accessToken || response.data?.accessToken;

      if (!accessToken) {
        throw new Error('Access token not found in response');
      }

      return accessToken;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUser = createAsyncThunk(
  'users/user-info',
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get('/users/user-info');
      return data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
