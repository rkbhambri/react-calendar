import { combineReducers } from 'redux';

import CalendarReducer from './calendar';

const reducers = combineReducers({
  calendar: CalendarReducer,
});

export default reducers;
