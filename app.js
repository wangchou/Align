import React, { Component } from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
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
  bookModels: state.books.bookshelfIds.map(bookId => state.books.byId[bookId]),
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

  render() {
    const {
      isKeyboardShow,
      keyboardHeight,
      bookModels,
      onVerticalScroll
    } = this.props;
    return (
      <View>
        <ScrollView
          ref={(scrollView) => {this.scrollView = scrollView}}
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          scrollEventThrottle={30}
          onScroll={this.onScroll}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          <StatusBar hidden />
          {bookModels.map(
            bookModel => <BookSwipeContainer
                          key={bookModel.id}
                          bookModel={bookModel}
                         />
          )}
          {isKeyboardShow ? <View style={{height: keyboardHeight}} /> : null}
        </ScrollView>
        {isKeyboardShow ? <KeyboardDimissButton keyboardHeight={keyboardHeight}/>: null}
        <KeyboardManager verticalScrollTo={this.verticalScrollTo}/>
      </View>
    );
  }
}
