import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNewCalendar = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 1),
    });
    openDateModal();
  };

  return (
    <button onClick={handleClickNew} className='btn btn-primary fab'>
      <i className='fas fa-plus'></i>
    </button>
  );
};
