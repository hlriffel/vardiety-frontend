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
          description: '',
          amount: ''
        }
      ],
      internalId: 3
    }
  ]
};

const initialDietReducer = (state = initialState, action) => {
  const payload = action.payload;

  if (action.type === ActionTypes.ADD_MEAL) {
    return produce(state, draft => {
      draft.meals.splice(payload.index, 0, payload.item);
    });
  } else if (action.type === ActionTypes.CHANGE_MEAL) {
    return produce(state, draft => {
      draft.meals[payload.index] = payload.item;
    });
  } else if (action.type === ActionTypes.REMOVE_MEAL) {
    return produce(state, draft => {
      draft.meals.splice(payload.index, 1);
    });
  } else if (action.type === ActionTypes.ADD_MEAL_ITEM) {
    return produce(state, draft => {
      draft.meals[payload.index].items.push(payload.item);
    });
  } else if (action.type === ActionTypes.CHANGE_MEAL_ITEM) {
    return produce(state, draft => {
      draft.meals[payload.mealIndex].items[payload.itemIndex] = payload.item;
    });
  } else if (action.type === ActionTypes.REMOVE_MEAL_ITEM) {
    return produce(state, draft => {
      draft.meals[payload.mealIndex].items.splice(payload.itemIndex, 1);
    });
  }

  return state;
};

export default initialDietReducer;
