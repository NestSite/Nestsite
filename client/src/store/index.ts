import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlices';
import totalsReducer from './slices/totalSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    totals: totalsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
