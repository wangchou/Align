import React, { Component } from 'react';
import moment from 'moment';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
} from 'react-native';

export default class BookSwipeContainer extends Component {
  render() {
    const bookModel = this.props.bookModel;
    const keys = [
      bookModel.moment.clone().subtract(1, bookModel.unit)[bookModel.unit](),
      bookModel.moment[bookModel.unit](),
      bookModel.moment.clone().add(1, bookModel.unit)[bookModel.unit](),
    ];

    return (
        <ScrollView
          style={styles.swipeContainer}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate={'fast'}
        >
          {keys.map(key => (
            <Text key={key} style={styles.pageView}>
              {key}
            </Text>
          ))}
        </ScrollView>
    );
  }
}

const fullWidth = Dimensions.get('window').width;
const pageHeight = 400;
const semiBold = "600";
const styles = StyleSheet.create({
  swipeContainer: {
    height: pageHeight,
    marginBottom: 5,
  },
  pageView: {
    width: fullWidth,
    padding: 10,
    fontSize: 16,
    fontWeight: semiBold,
    backgroundColor: '#FAFAFA',
    borderWidth: 0.5,
    borderColor: 'rgba(155, 155, 155, 0.5)'
  }
});
