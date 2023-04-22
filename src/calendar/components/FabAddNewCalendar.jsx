import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNewCalendar = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: 'Fiesta',
      notes: 'Comprar pastel',
      start: new Date(),
      end: addHours(new Date(), 1),
      user: {
        _id: '123',
        name: 'Luis Rodriguez',
      },
    });
    openDateModal();
  };

  return (
    <button onClick={handleClickNew} className='btn btn-primary fab'>
      <i className='fas fa-plus'></i>
    </button>
  );
};
