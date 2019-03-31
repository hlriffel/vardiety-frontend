import * as ActionTypes from './action-types.constants';

export const addMeal = payload => {
  return { type: ActionTypes.ADD_MEAL, payload };
}

export const changeMeal = payload => {
  return { type: ActionTypes.CHANGE_MEAL, payload };
}

export const removeMeal = payload => {
  return { type: ActionTypes.REMOVE_MEAL, payload };
}

export const addMealItem = payload => {
  return { type: ActionTypes.ADD_MEAL_ITEM, payload };
}

export const changeMealItem = payload => {
  return { type: ActionTypes.CHANGE_MEAL_ITEM, payload };
}

export const removeMealItem = payload => {
  return { type: ActionTypes.REMOVE_MEAL_ITEM, payload };
}
