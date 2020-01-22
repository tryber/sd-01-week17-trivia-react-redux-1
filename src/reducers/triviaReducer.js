const initialData = {
  data: {},
  isFetching: false,
  sucess: false,
};

const apiTriviaReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'LOAD_API_REQUEST':
      return {
        ...state,
        data: [],
        isFetching: true,
        sucess: false,
      };
    case 'LOAD_API_SUCESS':
      return {
        ...state,
        data: action.data,
        isFetching: false,
        sucess: true,
      };
    case 'LOAD_API_ERROR':
      return {
        ...state,
        data: [],
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default apiTriviaReducer;
