import {combineReducers} from 'redux';
import books from './books';
import pages from './pages';
import ui from './ui';

export default combineReducers({
  books,
  pages,
  ui
});
