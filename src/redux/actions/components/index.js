import api from '../../../services/api';

import * as ActionTypes from './action-types.constants';

export const requestComponents = () => {
  return { type: ActionTypes.REQUEST_COMPONENTS };
}

export const fetchComponents = payload => {
  return { type: ActionTypes.FETCH_COMPONENTS, payload }
}

export const receiveComponents = () => {
  return { type: ActionTypes.RECEIVE_COMPONENTS };
}

export const fetchAllComponents = () => {
  return (dispatch, getState) => {
    if (!getState().components.loading) {
      dispatch(requestComponents());
      return api.get('/component').then(response => {
        dispatch(receiveComponents());
        dispatch(fetchComponents(response.data));
      });
    }
  }
}
