const INITIAL_STATE = {
  score: 0,
  assertion: 0,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'QUESTION_SUCCESS':
      return {
        ...state,
        correct: true,
        score: action.score,
        assertion: action.assertion,
      };
    case 'QUESTION_FALSE':
      return {
        ...state,
        correct: false,
      };
    default:
      return state;
  }
};

export default gameReducer;
