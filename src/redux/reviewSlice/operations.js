import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '../../utils/errorUtils';
import authInstance from '../../api/axios/authInstance';
import toast from 'react-hot-toast';
import privateInstance from '../../api/axios/privateInstance';

export const createUserReview = createAsyncThunk(
  'reviews/createUserReview',
  async (reviewData , thunkAPI) => {
    try {
      const { data } = await privateInstance.post('/customer-reviews', reviewData);
      return data; 
    } catch (error) {
     
            const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    return thunkAPI.rejectWithValue(handleAxiosError(error));
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
      return thunkAPI.rejectWithValue(handleAxiosError(error));
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
       return thunkAPI.rejectWithValue(handleAxiosError(error));
      }
    }
  );
  
