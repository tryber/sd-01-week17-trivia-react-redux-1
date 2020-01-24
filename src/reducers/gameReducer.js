  const gameReducer = (state = {}, action) => {
    switch (action.type) {
      case 'QUESTION_SUCCESS':
        return {
          ...state,
          correct: true,
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
  