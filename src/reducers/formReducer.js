export const formTypes = {
  HANDLE_INPUT: 'FORM HANDLE-INPUT',
  SET_FORM: 'FORM SET-VALUES',
  RESET_FORM: 'FORM RESET-FORM',
};

export const formReducer = (state = {}, action) => {
  switch (action.type) {
    case formTypes.HANDLE_INPUT:
      return {
        ...state,
        [action.field]: action.payload,
      };
    case formTypes.SET_FORM:
      return action.payload;

    case formTypes.RESET_FORM:
      return action.payload;
      
    default:
      return state;
  }
};
