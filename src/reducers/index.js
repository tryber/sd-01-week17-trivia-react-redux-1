import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';
import questionsReducer from './questionFilterReducer';

const rootReducers = combineReducers({ triviaReducer, questionsReducer });
export default rootReducers;
