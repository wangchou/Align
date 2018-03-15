import {
  ACTION,
} from '../constants'

import { getTodayStr } from 'utils'

const intitialState = {
  isKeyboardShow: false,
  keyboardHeight: 0,
  scrollY: 0,
  scrollTo: () => {},
  focusedBookId: null,
  focusedPageId: null,
  selection: {},
  isStatusMode: false,
  isSettingPageFolded: true,
  isRecentTodoShow: false,
  today: getTodayStr(), // for rerender string after another day
}

export default (state = intitialState, action) => {
  switch (action.type) {
    case ACTION.SET_UI_STATE:
      return {
        ...state,
        ...action.payload,
      }
    case ACTION.SET_UI_SELECTION:
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
