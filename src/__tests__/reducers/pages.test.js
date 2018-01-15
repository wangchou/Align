import { setData } from '../../actions';
import pagesReducer, { intitialState } from '../../reducers/pages';

describe('pages reducer', () => {
  it('setData success', () => {
    const dataKey = '1983';
    const lastData = 'blah';
    const pagesState = [
      setData(dataKey, '...'),
      setData(dataKey, lastData),
    ].reduce(pagesReducer, intitialState);
    expect(pagesState[dataKey]).toEqual(lastData);
  });
});
