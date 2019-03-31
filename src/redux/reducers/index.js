import { combineReducers } from 'redux';

import initialDietReducer from './initial-diet';
import componentsReducer from './components';

const rootReducer = combineReducers({
  initialDiet: initialDietReducer,
  components: componentsReducer
});

export default rootReducer;
