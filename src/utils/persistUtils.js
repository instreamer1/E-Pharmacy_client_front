// utils/persistUtils.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


export const purgePersistedState = async () => {
  try {
    await storage.removeItem('persist:auth');
 
  } catch (error) {
    console.error('Failed to purge persisted state:', error);
  }
};


export const getPersistResetReducer = (reducer, initialState) => (state, action) => {
  if (action.type === 'RESET_STATE') {
    return persistReducer(
      { key: 'auth', storage },
      reducer
    )(initialState, action);
  }
  return reducer(state, action);
};