// ActionTypes
// book
export const GOTO_PAGE = 'GOTO_PAGE';
export const GOTO_TODAY_PAGE = 'GOTO_TODAY_PAGE';

// page
export const SET_PAGE_DATA = 'SET PAGE DATA';

// ui
export const INPUT_SWIPE_STARTED = 'SWIPE START';
export const INPUT_SWIPE_ENDED = 'SWIPE END';

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
export const swipeStarted = actionCreatorCreator(INPUT_SWIPE_STARTED);
export const swipeEnded = actionCreatorCreator(INPUT_SWIPE_ENDED);
