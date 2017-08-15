import moment from 'moment';

const intitialState = {
  byId: {
    "year book": {
      id: "year book",
      moment: moment(),
      unit: "year",
      format: "YYYY年",
      height: 300
    },
    "month book": {
      id: "month book",
      moment: moment(),
      unit: "month",
      format: "YYYY年 M月",
      height: 300
    },
    "day book": {
      id: "day book",
      moment: moment(),
      unit: "day",
      format: "M月 D日",
      height: 300
    }
  },
  bookshelfIds: ["year book", "month book", "day book"]
};

export default (state = intitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
