import {
  INPUT_SWIPE_STARTED,
  INPUT_SWIPE_ENDED
} from '../actions';

const intitialState = {
  isOnSwipe: false
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case INPUT_SWIPE_STARTED:
      return { ...state, isOnSwipe: true};

    case INPUT_SWIPE_ENDED:
      return { ...state, isOnSwipe: false};
  }
  return state;
}
