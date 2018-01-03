import {
  KEYBOARD_WILL_SHOW,
  KEYBOARD_WILL_HIDE,
  ON_VERTICAL_SCROLL,
  INPUT_SWIPE_STARTED,
  INPUT_SWIPE_ENDED
} from '../actions';

const intitialState = {
  keyboard: {
    isKeyboardShow: false,
    keyboardHeight: 0
  },
  scrollY: 0,
  isOnSwipe: false
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case KEYBOARD_WILL_SHOW:
      return {
        ...state,
        keyboard: {
          isKeyboardShow: true,
          keyboardHeight: action.keyboardHeight
        }
      };

    case KEYBOARD_WILL_HIDE:
      return { ...state, keyboard: intitialState.keyboard };

    case ON_VERTICAL_SCROLL:
      return { ...state, scrollY: action.scrollY };

    case INPUT_SWIPE_STARTED:
      return { ...state, isOnSwipe: true};

    case INPUT_SWIPE_ENDED:
      return { ...state, isOnSwipe: false};
  }
  return state;
}
