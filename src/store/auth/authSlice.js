import { createSlice } from '@reduxjs/toolkit';

export const authStatus = {
  notAuthenticated: 'not-authenticated',
  authenticated: 'authenticated',
  checking: 'checking',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: authStatus.notAuthenticated,
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: (state) => {
      state.status = authStatus.checking;
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = authStatus.authenticated;
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = authStatus.notAuthenticated;
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onRegister, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
