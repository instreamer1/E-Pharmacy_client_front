// cartSlice.js

export const selectCartItems = state => state.cart.items;
export const selectCartLoading = state => state.cart.isLoading;
export const selectCartError = state => state.cart.error;

export const selectCartTotal = state => {
  return state.cart.items.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);
};



export const selectCartItemCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);


// export const selectIsItemInCart = (productId) => (state) =>
//   state.cart.items.some((item) => item.productId._id === productId);

