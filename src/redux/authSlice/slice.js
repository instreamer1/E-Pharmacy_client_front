//authSlice/slice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  logInUser,
  logOutUser,
  refresh,
  getUser,
} from './operations';

console.log('Loading authSlice.js');

const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
    userId: null,
  },
  accessToken: null,
  isLoggedIn: false,
  isRefreshing: false,
  registerModalOpen: false,
  loginModalOpen: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOpenRegisterModal: state => {
      state.registerModalOpen = true;
      state.loginModalOpen = false;
    },
    setOpenLoginModal: state => {
      state.loginModalOpen = true;
      state.registerModalOpen = false;
    },
    setCloseModals: state => {
      state.loginModalOpen = false;
      state.registerModalOpen = false;
    },
   
  },
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
        console.log('payload from login:', action.payload);
        console.log('accessToken type:', typeof action.payload.accessToken);
        console.log('raw accessToken:', action.payload.accessToken);
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
        console.log(
          'Access token after logout:',
          localStorage.getItem('accessToken')
        );
        return initialState;

        // state.accessToken = null;
        // state.isLoggedIn = false;
        // state.isLoading = false;
        // state.error = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
        return initialState;
      })
      .addCase(refresh.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        // console.log('isRefreshing', action.payload);
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.accessToken = null;
        state.user = {
          name: null,
          email: null,
          phone: null,
          avatar: null,
          userId: null,
        };
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.phone,
          avatar: action.payload.avatar ?? null, // если он есть
          userId: action.payload.userId,
        };
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {  setTokenRefreshed, setOpenRegisterModal, setOpenLoginModal, setCloseModals } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
