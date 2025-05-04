import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleAxiosError } from '../../utils/errorUtils';

import { clearToken, instance, setToken } from '../../utils/axios';

export const getProducts = createAsyncThunk(
  'products',
  async (searchParams, thunkAPI) => {
   
    try {
      const response = await instance.get('/products',  {
        params: searchParams, 
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/productId',
  async (productId, thunkAPI) => {
    console.log( 'productId', productId);
    try {
      const response = await instance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getCategories = createAsyncThunk(
    'products/getCategories',
    async (_, thunkAPI) => {
      try {
        const response = await instance.get('/products/categories');
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleAxiosError(error));
      }
    }
  );