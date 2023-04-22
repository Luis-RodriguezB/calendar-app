import { configureStore } from '@reduxjs/toolkit';
import { calendatrSlice, uiSlice } from './';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    calendar: calendatrSlice.reducer
  },
});
