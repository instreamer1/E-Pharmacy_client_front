import { createAsyncThunk } from '@reduxjs/toolkit';

import { normalizeError } from '../../utils/errorHandler';
import publicInstance from '../../api/axios/publicInstance';

export const getProducts = createAsyncThunk(
  'products',
  async (searchParams, thunkAPI) => {
    try {
      const response = await publicInstance.get('/products', {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      const errorMessage = normalizeError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/productId',
  async (productId, thunkAPI) => {
    console.log('productId', productId);
    try {
      const response = await publicInstance.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      const errorMessage = normalizeError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async (_, thunkAPI) => {
    try {
      const response = await publicInstance.get('/products/categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalizeError(error));
    }
  }
);
