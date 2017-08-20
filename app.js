import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  ScrollView,
  Keyboard,
  View,
  Dimensions,
} from 'react-native';
import BookSwipeContainer from './components/BookSwipeContainer';
import KeyboardDimissButton from './components/KeyboardDismissButton';
import KeyboardManager from './components/KeyboardManager';
import {
  onVerticalScroll,
  swipeStarted,
  swipeEnded
} from './actions/ui';

@connect(state => ({
  books: state.books.bookshelfIds.map(bookId => state.books.byId[bookId]),
  isKeyboardShow: state.ui.keyboard.isKeyboardShow,
  keyboardHeight: state.ui.keyboard.keyboardHeight,
  isOnSwipe: state.ui.isOnSwipe,
}), {
  onVerticalScroll,
  swipeStarted,
  swipeEnded
})
export default class OnigiriNote extends Component {
  onScroll = (event) => {
    this.props.onVerticalScroll(event.nativeEvent.contentOffset.y);
  }

  verticalScrollTo = y => this.scrollView.scrollTo({y})

  onTouchMove = () => {
    if (!this.props.isOnSwipe) {
      this.props.swipeStarted();
    }
  }

  onTouchEnd = () => {
    if (this.props.isOnSwipe) {
      this.props.swipeEnded();
    }
  }

  shouldComponentUpdate(props) {
    return this.props.isKeyboardShow !== props.isKeyboardShow;
  }

  render() {
    const {
      isKeyboardShow,
      keyboardHeight,
      books,
      onVerticalScroll
    } = this.props;

    const bookContainers = books.map(book =>
       <BookSwipeContainer
        key={book.id}
        bookId={book.id}
       />
    );

    return (
      <View>
        <ScrollView
          ref={(scrollView) => {this.scrollView = scrollView}}
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          keyboardShouldPersistTaps={'always'}
          onScroll={this.onScroll}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          {bookContainers}
          <StatusBar hidden />
          {isKeyboardShow ? <View style={{height: keyboardHeight}} /> : null}
        </ScrollView>
        {isKeyboardShow ? <KeyboardDimissButton keyboardHeight={keyboardHeight}/>: null}
        <KeyboardManager verticalScrollTo={this.verticalScrollTo}/>
      </View>
    );
  }
}
