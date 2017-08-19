import React, { Component } from 'react';
import moment from 'moment';
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

const windowWidth = Dimensions.get('window').width;
const pageSeparatorWidth = 20;
const snapToInterval = windowWidth + pageSeparatorWidth;
const pageCenterIndex = 2;

@connect((state, props) => ({
  bookModel: state.books.byId[props.bookId],
  isOnSwipe: state.ui.isOnSwipe
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
      const bookModel = this.props.bookModel;
      const newBookMomentStr = moment(bookModel.momentStr).add(indexChange, bookModel.unit).format();
      this.props.changeBookPage(bookModel.id, newBookMomentStr);
    }
  }

  componentDidMount() {
    this.scrollToCenterPage();
  }

  componentDidUpdate() {
    // focus the center page after swipe
    const bookModel = this.props.bookModel;
    const dataKey = bookModel.id + "-" + moment(bookModel.momentStr).format(bookModel.dataKeyFormat);
    this.inputs[dataKey].focus();
    this.scrollToCenterPage();
  }

  shouldComponentUpdate(props) {
    return this.props.bookModel.id !== props.bookModel.id ||
           this.props.bookModel.momentStr !== props.bookModel.momentStr;
  }

  render() {
    const bookModel = this.props.bookModel;
    const pageViews = [-2, -1, 0, 1, 2]
      .map(shift => moment(bookModel.momentStr).add(shift, bookModel.unit))
      .map(moment => {
        const title = moment.format(bookModel.titleFormat);
        const dataKey = bookModel.id + "-" + moment.format(bookModel.dataKeyFormat);
        return (
          <BookPage
            key={dataKey}
            title={title}
            dataKey={dataKey}
            inputRef={(r) => {this.inputs[dataKey] = r;}}
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
  },
  pageSeparator: {
    width: pageSeparatorWidth,
    backgroundColor: 'rgba(155, 155, 155, 0.3)'
  }
});
