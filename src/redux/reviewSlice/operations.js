import { createAsyncThunk } from '@reduxjs/toolkit';
import { protectedInstance } from '../../utils/axios';
import { handleAxiosError } from '../../utils/errorUtils';

export const createUserReview = createAsyncThunk(
  'reviews/createUserReview',
  async (reviewData , thunkAPI) => {
    try {
      const { data } = await protectedInstance.post('/customer-reviews', reviewData);
      return data; 
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const updateUserReview = createAsyncThunk(
    'reviews/updateUserReview',
    async ({ productId, reviewData }, thunkAPI) => {
      try {
        const { data } = await protectedInstance.patch('/customer-reviews', reviewData);
        return data; 
      } catch (error) {
        const errorMessage = handleAxiosError(error);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
  export const deleteUserReview = createAsyncThunk(
    'reviews/deleteUserReview',
    async (productId, thunkAPI) => {
      try {
        await instance.delete('/customer-reviews');
        return productId; 
      } catch (error) {
        const errorMessage = handleAxiosError(error);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
