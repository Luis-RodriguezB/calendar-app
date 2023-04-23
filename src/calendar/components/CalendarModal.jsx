import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import { addHours } from 'date-fns';
import es from 'date-fns/locale/es';
import { differenceInSeconds } from 'date-fns';
import { useCalendarStore, useForm, useUiStore } from '../../hooks';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateOpenModal, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    formValues,
    title,
    notes,
    start,
    end,
    handleChange,
    onDateChanged,
    onSetForm,
  } = useForm({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return title.length > 0 ? '' : 'is-invalid';
  }, [title, formSubmitted]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(end, start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if (title.length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  useEffect(() => {
    if (activeEvent !== null) {
      onSetForm({ ...activeEvent });
    }
  }, [activeEvent]);

  return (
    <Modal
      isOpen={isDateOpenModal}
      style={customStyles}
      onRequestClose={closeDateModal}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          <DatePicker
            className='form-control'
            selected={start}
            name='start'
            onChange={(event) => onDateChanged(event, 'start')}
            dateFormat='Pp'
            locale='es'
            showTimeSelect
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={start}
            className='form-control'
            selected={end}
            name='end'
            onChange={(event) => onDateChanged(event, 'end')}
            dateFormat='Pp'
            locale='es'
            showTimeSelect
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${titleClass}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={title}
            onChange={handleChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={notes}
            onChange={handleChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
