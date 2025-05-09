// middleware/authMiddleware.js

import { isRejectedWithValue } from '@reduxjs/toolkit';
import { logOutUser } from '../authSlice/operations';

export const authMiddleware = store => next => action => {
  if (isRejectedWithValue(action)) {
    const status = action.payload?.status;

    if (status === 401) {
      console.warn('401 — dispatching logOutUser() from middleware');
      store.dispatch(logOutUser());
    }
  }

  return next(action);
};
