import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateOpenModal: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateOpenModal = true;
    },
    onCloseDateModal: (state) => {
      state.isDateOpenModal = false;
    },
  },
});

export const {
    onOpenDateModal,
    onCloseDateModal
} = uiSlice.actions;
