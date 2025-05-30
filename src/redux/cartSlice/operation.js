import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addProductToCart,
  fetchCartFromServer,
  removeProductFromCart,
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

// export const addToCard = createAsyncThunk(
//   "cart/update",
//     async (product, thunkAPI) => {
//     try {
//       const response = await putToCart(product);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(handleAxiosError(error));
//     }
//   }
// )

// export const updateCartItem = createAsyncThunk(
//   'cart/update',
//   async ({ productId, quantity }, thunkAPI) => {
//     try {
//       const response = await updateCartItemQuantity(productId, quantity);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (productId, thunkAPI) => {
    try {
      const response = await removeProductFromCart(productId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleAxiosError(error));
    }
  }
);
