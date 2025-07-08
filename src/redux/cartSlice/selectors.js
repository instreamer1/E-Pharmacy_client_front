// cartSlice.js

export const selectCartItems = state => state.cart.items;
export const selectCartLoading = state => state.cart.isLoading;
export const selectCartError = state => state.cart.error;

export const selectCartTotal = state => {
  const total = state.cart.items.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);
  return Number(total.toFixed(2));  
};



export const selectCartItemCount = state =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);




