import React, { Component } from 'react';
import BookPage from './BookPage';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {swipeStarted, swipeEnded} from '../actions/ui';
import {changeBookPage} from '../actions/books';
import {
  getTime,
  getDataKey,
  getTitle
} from '../utils/books';

const windowWidth = Dimensions.get('window').width;
const pageSeparatorWidth = 20;
const snapToInterval = windowWidth + pageSeparatorWidth;
const pageCenterIndex = 2;

@connect((state, props) => ({
  book: state.books.byId[props.bookId],
  isOnSwipe: state.ui.isOnSwipe,
  isKeyboardShow: state.ui.keyboard.isKeyboardShow
}),{
  swipeStarted,
  swipeEnded,
  changeBookPage
})
export default class BookSwipeContainer extends Component {
  constructor(props) {
    super(props);
    this.isKeyboardShow = false;
    this.inputs = {};
  }

  scrollToCenterPage = () => {
    this.scrollView.scrollTo({
      x: snapToInterval * pageCenterIndex,
      animated: false
    });
  }

  // doing the hard coded infinite scroll
  onScrollEnd = (event) => {
    const indexChange = event.nativeEvent.contentOffset.x/snapToInterval - pageCenterIndex;
    if (indexChange <= -1 || indexChange >= 1) {
      const book = this.props.book;
      this.props.changeBookPage(book.id, getTime(book, indexChange));
    }
  }

  componentDidMount() {
    this.scrollToCenterPage();
  }

  componentDidUpdate() {
    // focus the center page after swipe
    if(this.props.isKeyboardShow) {
      const book = this.props.book;
      const dataKey = getDataKey(book);
      this.inputs[dataKey].focus();
    }
    this.scrollToCenterPage();
  }

  shouldComponentUpdate(props) {
    return this.props.book.id !== props.book.id ||
           this.props.book.time !== props.book.time;
  }

  render() {
    const book = this.props.book;
    const pageViews = [-2, -1, 0, 1, 2]
      .map(shift => {
        const title = getTitle(book, shift);
        const dataKey = getDataKey(book, shift);
        return (
          <BookPage
            key={dataKey}
            title={title}
            dataKey={dataKey}
            inputRef={r => {this.inputs[dataKey] = r;}}
          />
        );
      });

    return (
      <ScrollView
        ref={(scrollView) => {this.scrollView = scrollView}}
        style={styles.swipeContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        keyboardShouldPersistTaps={'always'}
        snapToInterval={snapToInterval}
        onMomentumScrollEnd= {this.onScrollEnd}
      >
        {pageViews[0]}
        <View style={styles.pageSeparator} />
        {pageViews[1]}
        <View style={styles.pageSeparator} />
        {pageViews[2]}
        <View style={styles.pageSeparator} />
        {pageViews[3]}
        <View style={styles.pageSeparator} />
        {pageViews[4]}
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
    borderRadius: 5
  },
  pageSeparator: {
    width: pageSeparatorWidth,
    backgroundColor: 'rgba(155, 155, 155, 0.3)'
  }
});
