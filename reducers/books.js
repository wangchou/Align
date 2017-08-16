import moment from 'moment';

const intitialState = {
  byId: {
    "year book": {
      id: "year book",
      moment: moment(),
      unit: "year",
      titleFormat: "YYYY年",
      dataKeyFormat: "YYYY",
      // height: 300
    },
    "month book": {
      id: "month book",
      moment: moment(),
      unit: "month",
      titleFormat: "YYYY年 M月",
      dataKeyFormat: "YYYY MMM",
      // height: 300
    },
    "day book": {
      id: "day book",
      moment: moment(),
      unit: "day",
      titleFormat: "M月 D日",
      dataKeyFormat: "YYYY MMM DD",
      // height: 300
    }
  },
  bookshelfIds: ["year book", "month book", "day book"]
};

export default (state = intitialState, action) => {
  switch (action.type) {
  }
  return state;
}
