import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  logInUser,
  logOutUser,
  refresh,
  getUser,
} from './operations';

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
        console.log(action.payload.accessToken);
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
        console.log('Access token after logout:', localStorage.getItem('accessToken'));
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
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const {
  setOpenRegisterModal,
  setOpenLoginModal,
  setCloseModals,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
