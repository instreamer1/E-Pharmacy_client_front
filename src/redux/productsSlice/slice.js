import { createSlice } from '@reduxjs/toolkit';
import { getCategories, getProductById, getProducts } from './operations';

const initialState = {
  products: [],
  product: null,
  total: null,
  page: 1,
  limit: 9,
  totalPages: null,
  categories: [],
  category: 'All',
  searchTerm: '',
  isLoading: false,
  error: null,
    lastQuery: {
    category: '',
    search: '',
    page: 1,
    limit: 9,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // setCategory(state, action) {
    //   state.category = action.payload;
    // },
   setLastQuery: (state, action) => {
    state.lastQuery = action.payload;
  },
    // resetFilters(state) {
    //     state.category = 'All';
    //     state.searchTerm = '';
    //   },
      setPage(state, action) {
        state.page = action.payload;
      },
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;

        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.products = [];
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        // state.accessToken = action.payload.accessToken;
        console.log(action.payload);
        state.product = action.payload.product;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        state.product = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setLastQuery, setPage} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
