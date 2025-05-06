// utils/persistUtils.js
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/**
 * Полная очистка persisted state
 */
export const purgePersistedState = async () => {
  try {
    await storage.removeItem('persist:auth'); // Очищаем конкретный ключ
    // Или для полной очистки:
    // await storage.removeItem('persist:root'); 
  } catch (error) {
    console.error('Failed to purge persisted state:', error);
  }
};

/**
 * Сброс конкретного редьюсера к initialState
 */
export const getPersistResetReducer = (reducer, initialState) => (state, action) => {
  if (action.type === 'RESET_STATE') {
    return persistReducer(
      { key: 'auth', storage },
      reducer
    )(initialState, action);
  }
  return reducer(state, action);
};