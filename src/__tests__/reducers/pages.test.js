import { setData } from '../../actions'
import pagesReducer, { intitialState } from '../../reducers/pages'

describe('pages reducer', () => {
  it('setData success', () => {
    const pageId = '1983'
    const lastData = 'blah'
    const pagesState = [
      setData(pageId, '...'),
      setData(pageId, lastData),
    ].reduce(pagesReducer, intitialState)
    expect(pagesState[pageId]).toEqual(lastData)
  })
})
