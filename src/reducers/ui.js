import {
  SET_UI_STATE
} from '../actions';

const intitialState = {
  isTouchMoving: false,
  isKeyboardShow: false,
  keyboardHeight: 0,
  scrollY: 0
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_UI_STATE:
      const newState = { ...state };
      action.names.forEach((name) => {
        newState[name] = action[name];
      });
      return newState;
  }
  return state;
}
