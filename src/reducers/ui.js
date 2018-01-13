import {
  SET_UI_STATE,
} from '../actions';

const intitialState = {
  isTouchMoving: false,
  isKeyboardShow: false,
  keyboardHeight: 0,
  scrollY: 0,
  scrollTo: () => {},
  focusedBookId: null,
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_UI_STATE:
      return {
        ...state,
        ...action.names.map(name => ({
          [name]: action[name],
        })),
      };
  }
  return state;
};
