export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectIsOpenLoginModal = state => state.auth.loginModalOpen;
export const selectIsOpenRegisterModal = state => state.auth.registerModalOpen;
export const selectIsLoading = state => state.auth.isLoading;
export const selectError = state => state.auth.error;

