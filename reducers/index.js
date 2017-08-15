import {combineReducers} from 'redux';
import books from './books';
import pageData from './pageData';

export default combineReducers({
  books,
  pageData,
});
