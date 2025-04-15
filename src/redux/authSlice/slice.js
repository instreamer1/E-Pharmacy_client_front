import { createSlice } from '@reduxjs/toolkit';
import { registerUser, logInUser, logOutUser, refresh } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logInUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        return initialState;
        // state.accessToken = null;
        // state.isLoggedIn = false;
        // state.isLoading = false;
        // state.error = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = true;
      });
  },
});

export const authReducer = authSlice.reducer;
