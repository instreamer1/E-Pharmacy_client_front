import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchCartFromServer,
  addProductToOrder,
} from '../../api/auth.api';
import { handleAxiosError } from '../../utils/errorUtils';

export const fetchCart = createAsyncThunk('cart/fetch', async (_, thunkAPI) => {
  try {
    const response = await fetchCartFromServer();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(handleAxiosError(error));
  }
});

export const updateCartItem = createAsyncThunk(
  'cart/update',
  async (product, thunkAPI) => {
    try {
      const response = await addProductToCart(product);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error));
    }
  }
);

export const checkoutCart = createAsyncThunk(
  'cart/checkoutCart',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await addProductToOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  }
);