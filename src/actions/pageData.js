import {
  SET_PAGE_DATA
} from './actionTypes';

export const setData = (dataKey, data) => ({
  type: SET_PAGE_DATA,
  dataKey,
  data
});
