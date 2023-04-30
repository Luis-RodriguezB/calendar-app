import { useReducer } from 'react';
import { formReducer, formTypes } from '../reducers';

export const useForm = (initialForm = {}) => {
  const [formValues, dispatch] = useReducer(formReducer, initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: formTypes.HANDLE_INPUT,
      field: name,
      payload: value,
    });
  };

  const onDateChanged = (event, changing) => {
    dispatch({
      type: formTypes.HANDLE_INPUT,
      field: changing,
      payload: event,
    });
  };

  const onSetForm = (formValues) => {
    dispatch({
      type: formTypes.SET_FORM,
      payload: formValues,
    });
  };

  const onResetForm = (formValues) => {
    dispatch({
      type: formTypes.RESET_FORM,
      payload: formValues,
    });
  };

  return {
    formValues,
    ...formValues,

    handleChange,
    onDateChanged,
    onSetForm,
    onResetForm,
  };
};
