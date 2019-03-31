import { combineReducers } from 'redux';

import initialDietReducer from './initial-diet';

const rootReducer = combineReducers({
  initialDiet: initialDietReducer
});

export default rootReducer;
