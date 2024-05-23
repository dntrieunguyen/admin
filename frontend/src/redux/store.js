import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice.js';
import appSlice from './app/app.slice.js';

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      app: appSlice.reducer,
   },
});
