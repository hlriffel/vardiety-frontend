import produce from 'immer';

import * as ActionTypes from '../../actions/initial-diet/action-types.constants';

const initialState = {
  meals: [
    {
      id: null,
      name: 'Café',
      items: [
        {
          id: null,
          description: '',
          amount: ''
        }
      ],
      internalId: 1
    },
    {
      id: null,
      name: 'Almoço',
      items: [
        {
          id: null,
          description: '',
          amount: ''
        }
      ],
      internalId: 2
    },
    {
      id: null,
      name: 'Janta',
      items: [
        {
          id: null,
          description: 'Lasanha',
          amount: ''
        }
      ],
      internalId: 3
    }
  ]
};

const initialDietReducer = (state = initialState, action) => {
  if (action.type === ActionTypes.ADD_MEAL) {
    return produce(state, draft => {
      draft.meals.splice(action.index, 0, action.item);
    });
  } else if (action.type === ActionTypes.CHANGE_MEAL) {
    return produce(state, draft => {
      draft.meals[action.index] = action.item;
    });
  } else if (action.type === ActionTypes.REMOVE_MEAL) {
    return produce(state, draft => {
      draft.meals.splice(action.index, 1);
    });
  } else if (action.type === ActionTypes.ADD_MEAL_ITEM) {
    return produce(state, draft => {
      draft.meals[action.index].items.push(action.item);
    });
  } else if (action.type === ActionTypes.CHANGE_MEAL_ITEM) {
    return produce(state, draft => {
      draft.meals[action.mealIndex].items[action.itemIndex] = action.item;
    });
  } else if (action.type === ActionTypes.REMOVE_MEAL_ITEM) {
    return produce(state, draft => {
      draft.meals[action.mealIndex].items.splice(action.itemIndex, 1);
    });
  }

  return state;
};

export default initialDietReducer;
