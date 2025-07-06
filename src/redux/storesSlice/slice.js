import { createSlice } from '@reduxjs/toolkit';
import { getNearestStores, getStores } from './operations';

const initialState = {
  stores: [],
  nearestStores: [],
  total: null,
  page: 1,
  limit: 9,
  totalPages: null,
  isLoading: false,
  error: null,
  geoDenied: false,
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setStorePage(state, action) {
      state.page = action.payload;
    },
        setGeoDenied(state, action) {
      state.geoDenied = action.payload;
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
      })

      
      .addCase(getNearestStores.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNearestStores.fulfilled, (state, action) => {
        // console.log(action.payload.totalPages);
        state.nearestStores = action.payload;
        state.isLoading = false;
      })
      .addCase(getNearestStores.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { setStorePage, setGeoDenied } = storeSlice.actions;

export const storeReducer = storeSlice.reducer;
