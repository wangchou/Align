import { gotoPage } from 'actions'
import booksReducer, { intitialState } from 'reducers/books'

describe('books reducer', () => {
  it('gotoPage success', () => {
    const bookId = 'year book'
    const lastBookTime = 'blah'
    const booksState = [
      gotoPage(bookId, '...'),
      gotoPage(bookId, lastBookTime),
    ].reduce(booksReducer, intitialState)
    expect(booksState.byId[bookId].time).toEqual(lastBookTime)
  })
})
