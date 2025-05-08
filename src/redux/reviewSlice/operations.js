import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '../../utils/errorUtils';
import authInstance from '../../api/axios/authInstance';


export const createUserReview = createAsyncThunk(
  'reviews/createUserReview',
  async (reviewData , thunkAPI) => {
    try {
      const { data } = await authInstance.post('/customer-reviews', reviewData);
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
        const { data } = await authInstance.patch('/customer-reviews', reviewData);
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
        await authInstance.delete('/customer-reviews');
        return productId; 
      } catch (error) {
        const errorMessage = handleAxiosError(error);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
