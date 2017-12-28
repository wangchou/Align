import {SET_PAGE_DATA} from '../actions/actions';

const intitialState = {};

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_PAGE_DATA:
      return {
        ...state,
        [action.dataKey]: action.data
      };
  }
  return state;
}
