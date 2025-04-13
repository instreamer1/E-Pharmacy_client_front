import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { handleAxiosError } from '../../utils/errorUtils';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(apiUrl);
axios.defaults.baseURL = apiUrl;

axios.defaults.withCredentials = true;

axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

export const registerUser = createAsyncThunk(
  'users/signup',
  async (newUser, thunkAPI) => {
    console.log('newUser', newUser);
    try {
      const response = await axios.post('/users/signup', newUser);

      setAuthHeader(response.data.token);
      localStorage.setItem('authToken', response.data.token);
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
      const response = await axios.post('/users/signin', credentials);
      setAuthHeader(response.data.token);
      localStorage.setItem('authToken', response.data.accessToken);
      console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logOut = createAsyncThunk('users/signout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/users/signout');
    clearAuthHeader();
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return thunkAPI.rejectWithValue(errorMessage);
       // return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
  }
});

export const refresh = createAsyncThunk('users/refresh', async (_, thunkAPI) => {
  try {
    const { data } = await axios.post('/users/refresh');
    return data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const getUser = createAsyncThunk('users/current', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});