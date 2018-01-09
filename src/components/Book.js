import React, { Component } from 'react';
import Page from './Page';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {
  gotoPage
} from '../actions';
import {
  getTime,
  getPageDataKey,
  getPageTitle
} from '../utils/books';

const windowWidth = Dimensions.get('window').width;
const pageSeparatorWidth = 20;
const snapToInterval = windowWidth + pageSeparatorWidth;
const pageCenterIndex = 2;

@connect((state, props) => ({
  book: state.books.byId[props.bookId],
  isKeyboardShow: state.ui.isKeyboardShow,
  focusedBookId: state.ui.focusedBookId
}), {
  gotoPage
})
export default class Book extends Component {
  constructor(props) {
    super(props);
    this.inputs = {};
  }

  // section: Event Handlers and utils
  // doing the hard coded infinite scroll
  onMomentumScrollEnd = (event) => {
    const shift = event.nativeEvent.contentOffset.x/snapToInterval - pageCenterIndex;
    if (Math.abs(shift) >= 1) {
      const book = this.props.book;
      this.props.gotoPage(book.id, getTime(book, shift));
    }
  }

  scrollToCenterPage = () => {
    this.scrollView.scrollTo({
      x: snapToInterval * pageCenterIndex,
      animated: false
    });
  }

  onScroll = (event) => {
    const shift = Math.round(event.nativeEvent.contentOffset.x/snapToInterval) - pageCenterIndex;
    if(this.props.isKeyboardShow &&
       this.props.focusedBookId === this.props.book.id) {
      this.focusPage(shift);
    }
  }

  focusPage = (shift = 0) => {
    const book = this.props.book;
    const dataKey = getPageDataKey(book, shift);
    this.inputs[dataKey].focus();
  }

  // section: React Life-cycle methods
  componentDidMount() {
    this.scrollToCenterPage();
  }

  componentDidUpdate() {
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
        const title = getPageTitle(book, shift);
        const dataKey = getPageDataKey(book, shift);
        return (
          <Page
            key={dataKey}
            bookId={book.id}
            title={title}
            dataKey={dataKey}
            inputRef={r => {this.inputs[dataKey] = r;}}
          />
        );
      });

    return (
      <ScrollView
        style={styles.swipeContainer}
        ref={(scrollView) => {this.scrollView = scrollView}}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={'fast'}
        keyboardShouldPersistTaps={'always'}
        snapToInterval={snapToInterval}
        onScroll={this.onScroll}
        scrollEventThrottle={16}

        // Event Handler
        onMomentumScrollEnd= {this.onMomentumScrollEnd}
      >
        // Warning: Do not put other component between pageViews
        // or will get TextInput focus and rerender issue.
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
    borderRadius: 5
  }
});
