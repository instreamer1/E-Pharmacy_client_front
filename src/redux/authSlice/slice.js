import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, register } from './operations';


const initialState = {
  user: {
    name: null,
    email: null,
    phone: null,
    avatar: null,
  },
  token: localStorage.getItem('authToken') || null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
  favorites: [],
  noticesFavorites: [],
  pets: [],
  noticesViewed: [],
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { name, email, token } = action.payload;
        state.user = { ...state.user, name, email };
        state.token = token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      .addCase(logOut.fulfilled, (state, action) => {
        state.user = { name: null, email: null, phone: null, avatar: null };
        state.token = null;
        state.favorites = [];
        state.noticesFavorites = [];
        state.pets = [];
        state.noticesViewed = [];
        state.isLoggedIn = false;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      })
},
});

export const authReducer = authSlice.reducer;