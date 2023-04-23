import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickNew = () => {
    if (hasEventSelected) {
      startDeletingEvent();
    }
  };

  return (
    <button
      onClick={handleClickNew}
      className='btn btn-danger fab-danger'
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};
