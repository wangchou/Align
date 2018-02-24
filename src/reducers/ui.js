import {
  SET_UI_STATE,
  SET_UI_SELECTION,
} from '../constants'

const intitialState = {
  isKeyboardShow: false,
  keyboardHeight: 0,
  scrollY: 0,
  scrollTo: () => {},
  focusedBookId: null,
  focusedPageId: null,
  selection: {},
}

export default (state = intitialState, action) => {
  switch (action.type) {
    case SET_UI_STATE:
      return {
        ...state,
        ...action.payload,
      }
    case SET_UI_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.pageId]: action.selection,
        },
      }
  }
  return state
}
