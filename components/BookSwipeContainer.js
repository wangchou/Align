import React, { Component } from 'react';
import moment from 'moment';
import BookPage from './BookPage';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {swipeStarted, swipeEnded} from '../actions/ui';
import {changeBookPage} from '../actions/books';

const windowWidth = Dimensions.get('window').width;

@connect(null,{
  swipeStarted,
  swipeEnded,
  changeBookPage
})
export default class BookSwipeContainer extends Component {
  constructor(props) {
    super(props);
    this.isKeyboardShow = false;
    this._scrollView = null;
    this.scrollToCenterPage = () => {
      this._scrollView.scrollTo({
        x: windowWidth,
        animated: false
      });
    }
    this.onScroll = (event) => {
      if (Math.abs(event.nativeEvent.contentOffset.x - windowWidth) > 2) {
        this.props.swipeStarted();
      }
    }

    // doing the hard coded infinite scroll
    this.onScrollEnd = (event) => {
      this.props.swipeEnded();
      const bookModel = this.props.bookModel;
      const indexChange = event.nativeEvent.contentOffset.x/windowWidth - 1;
      const newBookMomentStr = moment(bookModel.momentStr).add(indexChange, bookModel.unit).format();
      this.props.changeBookPage(this.props.bookModel.id, newBookMomentStr);
    }
  }

  componentDidMount() {
    this.scrollToCenterPage();
  }

  componentDidUpdate() {
    this.scrollToCenterPage();
  }

  shouldComponentUpdate(props) {
    return this.props.bookModel.id !== props.bookModel.id ||
           this.props.bookModel.momentStr !== props.bookModel.momentStr;
  }

  render() {
    const bookModel = this.props.bookModel;
    const pageViews = [-1, 0, 1]
      .map(shift => moment(bookModel.momentStr).clone().add(shift, bookModel.unit))
      .map(moment => {
        const title = moment.format(bookModel.titleFormat);
        const dataKey = bookModel.id + "-" + moment.format(bookModel.dataKeyFormat);
        return (
          <BookPage
            key={dataKey}
            title={title}
            dataKey={dataKey}
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
        onMomentumScrollEnd= {this.onScrollEnd}
        keyboardShouldPersistTaps={'always'}
        scrollEventThrottle={100}
        onScroll={this.onScroll}
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
