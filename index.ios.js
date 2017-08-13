import React, { Component } from 'react';
import moment from 'moment';
import {
  AppRegistry,
  StatusBar,
  ScrollView,
} from 'react-native';
import BookSwipeContainer from './components/BookSwipeContainer';

const bookModels = [
  {
    id: "year book",
    moment: moment(),
    unit: "year",
    format: "YYYY年",
    height: 300
  },
  {
    id: "month book",
    moment: moment(),
    unit: "month",
    format: "YYYY年 M月",
    height: 300
  },
  {
    id: "day book",
    moment: moment(),
    unit: "day",
    format: "M月 D日",
    height: 300
  },
];

export default class OnigiriNote extends Component {
  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: 'rgba(155, 155, 155, 0.1)',
        }}
        showsHorizontalScrollIndicator={false}
      >
        <StatusBar hidden={true} />
        {bookModels.map(
          bookModel => <BookSwipeContainer
                        key={bookModel.id}
                        bookModel={bookModel}
                       />
        )}
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('OnigiriNote', () => OnigiriNote);
