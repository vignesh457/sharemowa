import { configureStore } from '@reduxjs/toolkit';
import bikerReducer from './slice/bikerFormSlice';
import riderReducer from './slice/riderFormSlice';

export const store = configureStore({
  reducer: {
    biker: bikerReducer,
    rider: riderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
