// ActionTypes
// book
export const GOTO_PAGE = 'GOTO_PAGE';
export const GOTO_TODAY_PAGE = 'GOTO_TODAY_PAGE';

// page
export const SET_PAGE_DATA = 'SET PAGE DATA';

// ui
export const KEYBOARD_WILL_SHOW = 'KEYBOARD_WILL_SHOW';
export const KEYBOARD_WILL_HIDE = 'KEYBOARD_WILL_HIDE';

export const INPUT_FOCUSED = 'INPUT_FOCUSED';
export const INPUT_SWIPE_STARTED = 'SWIPE START';
export const INPUT_SWIPE_ENDED = 'SWIPE END';
export const ON_VERTICAL_SCROLL = 'ON VERTICAL SCROLL';

const actionCreatorCreator = (actionType, names=null) => (...rest) => {
  if(names == null){
    return {type: actionType};
  } else {
    const dataObject = {};
    names.forEach((name, i) => dataObject[name] = rest[i]);
    return {
      type: actionType,
      ...dataObject
    };
  }
};

// ActionCreators
// book
export const gotoPage = actionCreatorCreator(GOTO_PAGE, ['bookId', 'time']);
export const gotoTodayPage = actionCreatorCreator(GOTO_TODAY_PAGE);

// page
export const setData = actionCreatorCreator(SET_PAGE_DATA, ['dataKey', 'data']);

// ui
export const keyboardWillShow = actionCreatorCreator(KEYBOARD_WILL_SHOW, ['keyboardHeight']);
export const keyboardWillHide = actionCreatorCreator(KEYBOARD_WILL_HIDE);

export const onVerticalScroll = actionCreatorCreator(ON_VERTICAL_SCROLL, ['scrollY']);
export const swipeStarted = actionCreatorCreator(INPUT_SWIPE_STARTED);
export const swipeEnded = actionCreatorCreator(INPUT_SWIPE_ENDED);
