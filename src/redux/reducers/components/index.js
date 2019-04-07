import produce from 'immer';

import * as ActionTypes from '../../actions/components/action-types.constants';

const initialState = {
  items: [],
  loading: false
};

const componentsReducer = (state = initialState, action) => {
  const payload = action.payload;

  if (action.type === ActionTypes.REQUEST_COMPONENTS) {
    return produce(state, draft => {
      draft.loading = true;
    });
  } else if (action.type === ActionTypes.FETCH_COMPONENTS) {
    return produce(state, draft => {
      draft.items = payload.map(component => {
        return {
          value: component.id.toString(),
          label: component.nm_component
        }
      });
    });
  } else if (action.type === ActionTypes.RECEIVE_COMPONENTS) {
    return produce(state, draft => {
      draft.loading = false;
    });
  }

  return state;
};

export default componentsReducer;
