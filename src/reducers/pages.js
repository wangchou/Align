import immutable from 'object-path-immutable'
import moment from 'moment'
import I18n from 'i18n'
import {
  getPageId,
  getStartOfWeekTime,
} from 'utils/books'
import {
  WEEK_BOOK_ID,
  WEEK_PAGE_ID_FORMAT,
  EMPTY_STATE_KEY,
  ACTION,
} from 'constants'

// empty state
// this week page id
const thisWeekPageId = getPageId(WEEK_BOOK_ID, moment(getStartOfWeekTime()), WEEK_PAGE_ID_FORMAT)
const intitialState = {
  [thisWeekPageId]: I18n.t(EMPTY_STATE_KEY),
}

export default (state = intitialState, action) => {
  switch (action.type) {
    case ACTION.SET_PAGE_DATA:
      return immutable.set(state, [action.payload.pageId], action.payload.data)
  }
  return state
}
