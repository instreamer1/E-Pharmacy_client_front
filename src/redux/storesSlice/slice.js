import { createSlice } from '@reduxjs/toolkit';
import { getStores } from './operations';


const initialState = {
  stores: [],
  nearestStores: [],
  total: null,
  page: 1,
  limit: 9,
  totalPages: null,
  isLoading: false,
  error: null,
};


const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
   setStorePage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getStores.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        // console.log(action.payload.totalPages);
        state.stores = action.payload.stores;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {setStorePage} = storeSlice.actions;

export const storeReducer = storeSlice.reducer;
