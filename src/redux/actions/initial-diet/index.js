import * as ActionTypes from './action-types.constants';

export function addMeal(index, item) {
  return { type: ActionTypes.ADD_MEAL, index, item };
}

export function changeMeal(index, item) {
  return { type: ActionTypes.CHANGE_MEAL, index, item };
}

export function removeMeal(index) {
  return { type: ActionTypes.REMOVE_MEAL, index };
}

export function addMealItem(index, item) {
  return { type: ActionTypes.ADD_MEAL_ITEM, index, item };
}

export function changeMealItem(mealIndex, itemIndex, item) {
  return { type: ActionTypes.CHANGE_MEAL_ITEM, mealIndex, itemIndex, item };
}

export function removeMealItem(mealIndex, itemIndex) {
  return { type: ActionTypes.REMOVE_MEAL_ITEM, mealIndex, itemIndex };
}
