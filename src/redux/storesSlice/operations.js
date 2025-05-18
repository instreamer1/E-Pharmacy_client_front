import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleAxiosError } from "../../utils/errorUtils";
import publicInstance from "../../api/axios/publicInstance";

export const getStores = createAsyncThunk(
  'products',
  async (credentials, thunkAPI) => {
    try {
      const response = await publicInstance.get('/stores', { params:credentials});
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = handleAxiosError(error);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);