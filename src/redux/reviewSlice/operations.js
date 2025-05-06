import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '../../utils/errorUtils';
import privateInstance from '../../api/axios/private';

export const createUserReview = createAsyncThunk(
  'reviews/createUserReview',
  async (reviewData , thunkAPI) => {
    try {
      const { data } = await privateInstance.post('/customer-reviews', reviewData);
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
        const { data } = await privateInstance.patch('/customer-reviews', reviewData);
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
        await privateInstance.delete('/customer-reviews');
        return productId; 
      } catch (error) {
        const errorMessage = handleAxiosError(error);
        return thunkAPI.rejectWithValue(errorMessage);
      }
    }
  );
  
