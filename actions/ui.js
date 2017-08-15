import {
  KEYBOARD_WILL_SHOW,
  KEYBOARD_WILL_HIDE,
  ON_VERTICAL_SCROLL,
  INPUT_SWIPE_STARTED,
  INPUT_SWIPE_ENDED
} from './actionTypes';

export const keyboardWillShow = (keyboardHeight) => ({
  type: KEYBOARD_WILL_SHOW,
  keyboardHeight
});

export const keyboardWillHide = (keyboardHeight) => ({
  type: KEYBOARD_WILL_HIDE,
});

export const onVerticalScroll = (scrollY) => ({
  type: ON_VERTICAL_SCROLL,
  scrollY
});

export const swipeStarted = () => ({type: INPUT_SWIPE_STARTED});
export const swipeEnded = () => ({type: INPUT_SWIPE_ENDED});
