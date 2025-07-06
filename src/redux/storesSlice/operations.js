import { createAsyncThunk } from '@reduxjs/toolkit';
import { normalizeError } from '../../utils/errorHandler';
import publicInstance from '../../api/axios/publicInstance';

export const getStores = createAsyncThunk(
  'stores',
  async (credentials, thunkAPI) => {
    try {
      const response = await publicInstance.get('/stores', {
        params: credentials,
      });
      return response.data;
    } catch (error) {
      const errorMessage = normalizeError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


// /api/stores/nearest

export const getNearestStores = createAsyncThunk(
  'stores/getNearestStores',
  async (
    coords,
    thunkAPI
  ) => {
    try {
      const url = coords
        ? `/stores/nearest?lat=${coords.lat}&lng=${coords.lng}`
        : `/stores/nearest`;

      const res = await publicInstance.get(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(normalizeError(error));
    }
  }
);
