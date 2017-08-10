import React, { Component } from 'react';
import moment from 'moment';
import {
  AppRegistry,
  ScrollView
} from 'react-native';
import BookSwipeContainer from './components/BookSwipeContainer';

const bookModels = [
  {
    id: "year book",
    moment: moment(),
    unit: "year",
    format: "YYYY",
    height: 350
  },
  {
    id: "month book",
    moment: moment(),
    unit: "month",
    format: "MMM",
    height: 350
  },
  {
    id: "day book",
    moment: moment(),
    unit: "day",
    format: "Do",
    height: 350
  },
];

export default class OnigiriNote extends Component {
  render() {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
      >
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
