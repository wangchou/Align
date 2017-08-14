import React, { Component } from 'react';
import moment from 'moment';
import BookPage from './BookPage';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class BookSwipeContainer extends Component {
  constructor(props) {
    super(props);
    this._scrollView = null;
    this.scrollToCenterPage = () => {
      this._scrollView.scrollTo({
        x: windowWidth,
        animated: false
      });
    }
    this.preparePageBufferOnScrollEnd = (event) => {
      const bookModel = this.props.bookModel;
      const indexChange = event.nativeEvent.contentOffset.x/windowWidth - 1;
      bookModel.moment.add(indexChange, bookModel.unit);
      this.forceUpdate();
    }
  }

  componentDidMount() {
    this.scrollToCenterPage();
  }

  componentDidUpdate() {
    this.scrollToCenterPage();
  }

  render() {
    const bookModel = this.props.bookModel;
    const pageViews = [-1, 0, 1]
      .map(shift => bookModel.moment.clone().add(shift, bookModel.unit))
      .map(moment => {
        const key = bookModel.id + moment.format('YYYY MMM DD');
        return (
          <BookPage
            key={key}
            moment={moment}
            bookId={bookModel.id}
            bookFormat={bookModel.format}
          />
        );
      });

    return (
      <ScrollView
        ref={(scrollView) => {this._scrollView = scrollView}}
        style={styles.swipeContainer}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        onMomentumScrollEnd= {this.preparePageBufferOnScrollEnd}
        keyboardShouldPersistTaps={'always'}
      >
        {pageViews}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  swipeContainer: {
    backgroundColor: '#FAFAFA',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(155, 155, 155, 0.5)',
    marginBottom: 5,
  },
});
