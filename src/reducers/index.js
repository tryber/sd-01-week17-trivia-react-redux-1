import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';
import gameReducer from './gameReducer';
import questionsReducer from './questionFilterReducer';
// import answerReducer from './answerReducer';

const rootReducers = combineReducers({ triviaReducer, questionsReducer, gameReducer });

export default rootReducers;
