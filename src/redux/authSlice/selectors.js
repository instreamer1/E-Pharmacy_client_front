export const selectUser = state => state.users.user;
export const selectIsLoggedIn = state => state.users.isLoggedIn;
export const selectIsRefreshing = state => state.users.isRefreshing;
export const selectIsLoading = state => state.users.isLoading;
export const selectError = state => state.users.error;