import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickNew = () => {
    if (!hasEventSelected) return;

    Swal.fire({
      title: '¿Estás seguro de eliminar la tarea?',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        startDeletingEvent();
        Swal.fire('Tarea eliminada', '', 'success');
      } else {
        Swal.fire('Tarea no eliminada', '', 'info');
      }
    });

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
