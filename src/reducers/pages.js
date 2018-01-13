import immutable from 'object-path-immutable';
import { SET_PAGE_DATA } from '../actions';

const intitialState = {};

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_PAGE_DATA:
      return immutable.set(state, [action.dataKey], action.data);
  }
  return state;
};
