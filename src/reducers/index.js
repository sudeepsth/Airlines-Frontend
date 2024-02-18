import { combineReducers } from 'redux';
import flight from './flight';

const rootReducer = combineReducers({
  flightList: flight,
});

export default rootReducer;
