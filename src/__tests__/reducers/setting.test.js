import {
  YEAR_BOOK_ID,
  MONTH_BOOK_ID,
  WEEK_BOOK_ID,
  DAY_BOOK_ID,
  setFontScale,
  setBookNumOfLines,
} from 'actions'
import settingReducer from 'reducers/setting'

describe('setting reducer', () => {
  it('SET Font Scale', () => {
    const lastScale = 1.99
    const settingState = [
      setFontScale(999),
      setFontScale(100),
      setFontScale(lastScale),
    ].reduce(settingReducer)
    expect(settingState.fontScale).toEqual(lastScale)
  })
  it('SET number of lines', () => {
    const year = 11
    const month = 12
    const week = 13
    const day = 14
    const numberOfLines = {
      [YEAR_BOOK_ID]: year,
      [MONTH_BOOK_ID]: month,
      [WEEK_BOOK_ID]: week,
      [DAY_BOOK_ID]: day,
    }
    const settingState = [
      setBookNumOfLines(YEAR_BOOK_ID, year),
      setBookNumOfLines(MONTH_BOOK_ID, month),
      setBookNumOfLines(WEEK_BOOK_ID, week),
      setBookNumOfLines(DAY_BOOK_ID, day),
    ].reduce(settingReducer)
    expect(settingState.numberOfLines).toEqual(numberOfLines)
  })
})
