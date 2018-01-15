import { setScrollY } from '../../actions';
import uiReducer from '../../reducers/ui';

describe('ui reducer', () => {
  it('SET ScrollY success', () => {
    const lastY = 123;
    const uiState = [
      setScrollY(999),
      setScrollY(100),
      setScrollY(lastY),
    ].reduce(uiReducer);
    expect(uiState.scrollY).toEqual(lastY);
  });
});
