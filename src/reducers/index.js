import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';
import gameReducer from './gameReducer';
import question from './question';

const rootReducers = combineReducers({ triviaReducer, gameReducer, question });
export default rootReducers;
