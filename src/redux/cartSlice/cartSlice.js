// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateCartItem, fetchCart, checkoutCart } from './operation';

const initialState = {
  shippingInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  paymentMethod: 'Cash On Delivery',
  items: [],
  isLoading: false,
  error: null,
  checkoutSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    clearCart(state) {
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
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(checkoutCart.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.checkoutSuccess = false;
      })
      .addCase(checkoutCart.fulfilled, state => {
        state.isLoading = false;
        state.items = [];
        state.checkoutSuccess = true;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.checkoutSuccess = false;
      });
  },
});

export const { setShippingInfo, setPaymentMethod, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
