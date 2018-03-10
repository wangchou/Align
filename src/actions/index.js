import {
  getNow,
  getStartOfWeekTime,
} from 'utils/books'

import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  SMALL_SPACE,
  ACTION,
} from 'constants'

const {
  GOTO_PAGE,
  SET_PAGE_DATA,
  SET_UI_STATE,
  SET_UI_SELECTION,
  SET_FONT_SCALE,
  SET_BOOK_NUM_OF_LINES,
  RESET_SETTINGS,
} = ACTION

const actionCreatorCreator = (actionType, names = {}) => (...rest) => ({
  type: actionType,
  payload: names.reduce((payload, name, i) => ({
    ...payload,
    [name]: rest[i],
  }), {}),
})

// ActionCreators
// book
export const gotoPage = actionCreatorCreator(GOTO_PAGE, ['bookId', 'time'])
export const gotoTodayPage = () => ([
  gotoPage(YEAR_BOOK_ID, getNow()),
  gotoPage(MONTH_BOOK_ID, getNow()),
  gotoPage(WEEK_BOOK_ID, getStartOfWeekTime()),
  gotoPage(DAY_BOOK_ID, getNow()),
])

// page
export const setData = actionCreatorCreator(SET_PAGE_DATA, ['pageId', 'data'])

// setting
export const setFontScale = actionCreatorCreator(SET_FONT_SCALE, ['data'])
export const setBookNumOfLines = actionCreatorCreator(SET_BOOK_NUM_OF_LINES, ['bookId', 'data'])
export const resetSettings = () => ({ type: RESET_SETTINGS })

// ui
export const setScrollY = actionCreatorCreator(SET_UI_STATE, ['scrollY'])
export const setKeyboardHeight = actionCreatorCreator(SET_UI_STATE, ['keyboardHeight'])
export const setIsKeyboardShow = actionCreatorCreator(SET_UI_STATE, ['isKeyboardShow'])
export const setScrollTo = actionCreatorCreator(SET_UI_STATE, ['scrollTo'])
export const setFocusedBookId = actionCreatorCreator(SET_UI_STATE, ['focusedBookId'])
export const setFocusedPageId = actionCreatorCreator(SET_UI_STATE, ['focusedPageId'])
export const setIsStatusMode = actionCreatorCreator(SET_UI_STATE, ['isStatusMode'])
export const setIsSettingPageFolded = actionCreatorCreator(SET_UI_STATE, ['isSettingPageFolded'])
export const setIsRecentTodoShow = actionCreatorCreator(SET_UI_STATE, ['isRecentTodoShow'])
export const setToday = actionCreatorCreator(SET_UI_STATE, ['today'])
export const setSelection = (pageId, selection) => ({
  type: SET_UI_SELECTION,
  pageId,
  selection,
})

// insertCheckbox
export const insertText = text => (dispatch, getState) => {
  const {
    ui: {
      focusedPageId: pageId,
      selection,
    },
    pages,
  } = getState()
  if (!selection[pageId]) {
    selection[pageId] = { start: 0, end: 0 }
  }
  const { start, end } = selection[pageId]
  const oldText = pages[pageId]
  let appendBefore = ''
  const insertAfter = SMALL_SPACE
  if (oldText && start >= 1 && !'\t \n'.includes(oldText[start - 1])) {
    appendBefore += ' ' // big space
  }

  const newText = oldText ?
    oldText.slice(0, start) + appendBefore + text + insertAfter + oldText.slice(end) :
    text + insertAfter
  dispatch(setData(pageId, newText))
}

export const toggleIsStatusMode = () => (dispatch, getState) => {
  const {
    ui: {
      isStatusMode,
    },
  } = getState()
  dispatch(setIsStatusMode(!isStatusMode))
}

export const toggleIsSettingPageFolded = () => (dispatch, getState) => {
  const {
    ui: {
      isSettingPageFolded,
    },
  } = getState()
  dispatch(setIsSettingPageFolded(!isSettingPageFolded))
}
