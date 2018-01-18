import {
  SET_UI_STATE,
} from '../constants'

const intitialState = {
  isTouchMoving: false,
  isKeyboardShow: false,
  keyboardHeight: 0,
  scrollY: 0,
  scrollTo: () => {},
  focusedBookId: null,
}

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_UI_STATE:
      return {
        ...state,
        ...action.payload,
      }
  }
  return state
}
