import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getDate(),
  title: 'Cumpleaños de copito',
  notes: 'Hay que comprar pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: '123',
    name: 'Luis Rodriguez',
  },
};

export const calendatrSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
  },
});

export const { onSetActiveEvent } = calendatrSlice.actions;
