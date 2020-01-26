const INITIAL_STATE = {
  correct: false,
};
const question = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TYPE_QUESTION_DA_HORA':
      return {
        ...state,
        correct: true,
      };
    default:
      return state;
  }
};

export default question;
