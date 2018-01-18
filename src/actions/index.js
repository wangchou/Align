import {
  getNow,
  getStartOfWeekTime,
} from '../utils/books'

import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  GOTO_PAGE,
  SET_PAGE_DATA,
  SET_UI_STATE,
} from '../constants'

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
export const setData = actionCreatorCreator(SET_PAGE_DATA, ['dataKey', 'data'])

// ui
export const setIsTouchMoving = actionCreatorCreator(SET_UI_STATE, ['isTouchMoving'])
export const setScrollY = actionCreatorCreator(SET_UI_STATE, ['scrollY'])
export const setKeyboardHeight = actionCreatorCreator(SET_UI_STATE, ['keyboardHeight'])
export const setIsKeyboardShow = actionCreatorCreator(SET_UI_STATE, ['isKeyboardShow'])
export const setScrollTo = actionCreatorCreator(SET_UI_STATE, ['scrollTo'])
export const setFocusedBookId = actionCreatorCreator(SET_UI_STATE, ['focusedBookId'])
