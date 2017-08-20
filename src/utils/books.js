import moment from 'moment';

export const getTime = (book, shift = 0) => {
  return moment(book.time)
           .add(shift, book.unit)
           .format();
}

export const getPageDataKey = (book, shift = 0) => {
  return book.id + "-" + moment(book.time)
                           .add(shift, book.unit)
                           .format(book.dataKeyFormat);
}
export const getPageTitle = (book, shift = 0) => {
  return moment(book.time)
           .add(shift, book.unit)
           .format(book.titleFormat);
}
