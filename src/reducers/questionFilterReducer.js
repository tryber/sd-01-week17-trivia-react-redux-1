const initialValue = '';

const questionsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'CHANGE_CATEGORY':
      return {
        ...state,
        category: action.questionCategory,
      };
    case 'CHANGE_TYPE':
      return {
        ...state,
        type: action.questionType,
      };
    case 'CHANGE_DIFFICULTY':
      return {
        ...state,
        difficulty: action.questionDifficulty,
      };
    default:
      return state;
  }
};

export default questionsReducer;
