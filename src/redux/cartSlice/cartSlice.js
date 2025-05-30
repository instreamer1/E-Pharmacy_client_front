// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateCartItem, fetchCart, removeFromCart } from './operation';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // removeFromCart: (state, action) => {
    //   state.items = state.items.filter(item => item._id !== action.payload);
    // },
    clearCart: state => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCartItem.pending, state => {
        // state.isLoading = true;
        // state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        // const existingIndex = state.items.findIndex(
        //   item => item._id === action.payload._id
        // );
        // if (existingIndex !== -1) {
        //   // обновить количество
        //   state.items[existingIndex].quantity = action.payload.quantity;
        // } else {
        //   state.items.push(action.payload);
        // }
        // state.isLoading = false;
        state.items = action.payload.items;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        // state.isLoading = false;
        // state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
