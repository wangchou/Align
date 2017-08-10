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
    height: 350
  },
  {
    id: "month book",
    moment: moment(),
    unit: "month",
    height: 350
  },
  {
    id: "day book",
    moment: moment(),
    unit: "day",
    height: 350
  },
];

export default class OnigiriNote extends Component {
  render() {
    return (
      <ScrollView>
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
