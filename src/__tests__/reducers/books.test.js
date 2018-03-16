import { gotoPage } from 'actions'
import booksReducer, { intitialState } from 'reducers/books'

describe('books reducer', () => {
  it('gotoPage success', () => {
    const bookId = 'year book'
    const lastBookPageId = 'blah'
    const booksState = [
      gotoPage(bookId, '...'),
      gotoPage(bookId, lastBookPageId),
    ].reduce(booksReducer, intitialState)
    expect(booksState.byId[bookId].currentPageId).toEqual(lastBookPageId)
  })
})
