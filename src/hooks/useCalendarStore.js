import { useDispatch, useSelector } from 'react-redux';
import { onSetActiveEvent } from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const setActiveEvent = (calendarEvent) => {
    if (!calendarEvent) return;

    dispatch(onSetActiveEvent(calendarEvent));
  };

  return {
    events,
    activeEvent,

    setActiveEvent,
  };
};