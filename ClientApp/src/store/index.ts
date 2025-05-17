import { configureStore } from '@reduxjs/toolkit';
import errorReducer from './error/slice';

export const store = configureStore({
  reducer: {
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 