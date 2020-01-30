const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'QUESTION_SUCCESS':
      return {
        ...state,
        correct: true,
        score: action.score,
        assertions: action.assertions,
      };
    case 'QUESTION_FALSE':
      return {
        ...state,
        correct: false,
      };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default gameReducer;
