// https://github.com/fbsamples/f8app/blob/master/js/store/array.js
export default () => next => action =>
  (Array.isArray(action) ? action.map(next) : next(action));
