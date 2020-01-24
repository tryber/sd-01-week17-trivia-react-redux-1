const triviaToken = localStorage.token;
// export const questionTrue = (quest) => ({
//   type: 'TYPE_QUESTION_DA_HORA',
//   quest,
// })

export const successQuestion = () => ({
  type: 'QUESTION_SUCCESS',
})

export const falseQuestion = () => ({
  type: 'QUESTION_FALSE',
})

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

export const loadData = () => (dispatch) => {
  dispatch(loadDataRequest());
  fetch(`https://opentdb.com/api.php?amount=5&token=${triviaToken}`)
    .then((data) => data.json())
    .then((response) => dispatch(loadDataSucess(response)))
    .catch(() => dispatch(loadDataError()));
};
