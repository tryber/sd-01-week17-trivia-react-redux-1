// const triviaToken = localStorage.token;
// // export const questionTrue = (quest) => ({
// //   type: 'TYPE_QUESTION_DA_HORA',
// //   quest,
// // })

export const successQuestion = (score, assertions) => ({
  type: 'QUESTION_SUCCESS',
  score,
  assertions,
});

export const falseQuestion = () => ({
  type: 'QUESTION_FALSE',
});

export const resetScore = () => ({
  type: 'RESET',
});

export const loadDataSucess = (data) => ({
  type: 'LOAD_API_SUCESS',
  data,
});

export const loadDataError = () => ({
  type: 'LOAD_API_ERROR',
});

export const loadDataRequest = () => ({
  type: 'LOAD_API_REQUEST',
});

export const loadData = (url) => (dispatch) => {
  dispatch(loadDataRequest());
  fetch(url)
    .then((data) => data.json())
    .then((response) => dispatch(loadDataSucess(response)))
    .catch(() => dispatch(loadDataError()));
};

export const changeCategory = (questionCategory) => ({
  type: 'CHANGE_CATEGORY',
  questionCategory,
});

export const changeType = (questionType) => ({
  type: 'CHANGE_TYPE',
  questionType,
});

export const changeDifficulty = (questionDifficulty) => ({
  type: 'CHANGE_DIFFICULTY',
  questionDifficulty,
});
