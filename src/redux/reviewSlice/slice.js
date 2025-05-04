import { createSlice } from '@reduxjs/toolkit';
import { createUserReview } from './operations';
import { getProductById } from '../productsSlice/operations';
const initialState = {
  reviews: [],
  userReview: null,
  total: null,
  page: 1,
  limit: 9,
  totalPages: null,
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setUserReview: (state, action) => {
      state.userReview = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // .addCase(getProductById.pending, state => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      .addCase(getProductById.fulfilled, (state, action) => {
        // state.accessToken = action.payload.accessToken;
        console.log(action.payload);
        state.reviews = action.payload.reviews.reviews;
        state.userReview = action.payload.userReview;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      // .addCase(getProductById.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.isLoading = false;
      // })
      .addCase(createUserReview.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserReview.fulfilled, (state, action) => {
        state.loading = false;
        state.userReview = action.payload;
        state.reviews= [...state.reviews, action.payload ]
      })
      .addCase(createUserReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setUserReview } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
