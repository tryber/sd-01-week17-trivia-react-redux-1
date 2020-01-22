import { combineReducers } from 'redux';
import triviaReducer from './triviaReducer';

const rootReducers = combineReducers({ triviaReducer });
export default rootReducers;
