import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  ScrollView,
  Keyboard,
  View,
  Dimensions,
} from 'react-native';
import BookSwipeView from './components/BookSwipeView';
import KeyboardDimissButton from './components/KeyboardDismissButton';
import TodayButton from './components/TodayButton';
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
    return this.props.isKeyboardShow !== props.isKeyboardShow ||
           this.props.keyboardHeight !== props.keyboardHeight;
  }

  render() {
    const {
      isKeyboardShow,
      keyboardHeight,
      books,
      onVerticalScroll
    } = this.props;

    const bookViews = books.map(book =>
       <BookSwipeView
        key={book.id}
        bookId={book.id}
       />
    );

    let keyboardAvoidingView = null;
    let keyboardDismissButton = null;
    let todayButton = null;
    if (isKeyboardShow) {
      keyboardAvoidingView = <View style={{height: keyboardHeight}} />;
      keyboardDismissButton = <KeyboardDimissButton keyboardHeight={keyboardHeight}/>;
    } else {
      todayButton = <TodayButton />;
    }

    return (
      <View>
        <ScrollView
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          ref={(scrollView) => {this.scrollView = scrollView}}
          keyboardShouldPersistTaps={'always'}

          // Event Handlers
          onScroll={this.onScroll}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
        >
          {bookViews}
          <StatusBar hidden />
          {keyboardAvoidingView}
        </ScrollView>
        {keyboardDismissButton}
        {todayButton}
        <KeyboardManager verticalScrollTo={this.verticalScrollTo}/>
      </View>
    );
  }
}
