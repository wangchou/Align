import {
  SET_IS_TOUCH_MOVING
} from '../actions';

const intitialState = {
  isTouchMoving: false
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_IS_TOUCH_MOVING:
      return { ...state, isTouchMoving: action.isTouchMoving };

  }
  return state;
}
