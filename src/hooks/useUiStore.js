import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {
  const { isDateOpenModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return {
    isDateOpenModal,

    openDateModal: () => dispatch(onOpenDateModal()),
    closeDateModal: () => dispatch(onCloseDateModal()),
  };
};
