import { configureStore } from '@reduxjs/toolkit';


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {authReducer} from './authSlice/slice';
import { productsReducer } from './productsSlice/slice';
import { reviewsReducer } from './reviewSlice/slice';
import { authMiddleware } from './middleware/authMiddleware';
import { storeReducer } from './storesSlice/slice';
import { cartReducer } from './cartSlice/cartSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'isLoggedIn'],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    products: productsReducer,
    reviews: reviewsReducer,
    stores: storeReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authMiddleware),
});



export const persistor = persistStore(store);
