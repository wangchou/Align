import {SET_PAGE_DATA} from './actionTypes';

const intitialState = {};

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_PAGE_DATA:
      return {
        ...state,
        [action.payload.key]:action.payload.data
      };
      break;
    default:
      return state;
  }
}
