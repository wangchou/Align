import moment from 'moment';

export const getMomentStr = (bookModel, shift = 0) => {
  return moment(bookModel.momentStr)
           .add(shift, bookModel.unit)
           .format();
}

export const getDataKey = (bookModel, shift = 0) => {
  return bookModel.id + "-" + moment(bookModel.momentStr)
                                .add(shift, bookModel.unit)
                                .format(bookModel.dataKeyFormat);
}
export const getTitle = (bookModel, shift = 0) => {
  return moment(bookModel.momentStr)
           .add(shift, bookModel.unit)
           .format(bookModel.titleFormat);
}
