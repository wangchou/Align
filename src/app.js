import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  ScrollView,
  Keyboard,
  View,
  Dimensions,
} from 'react-native';
import Book from './components/Book';
import FloatEditBar from './components/FloatEditBar';
import TodayButton from './components/TodayButton';
import KeyboardManager from './components/KeyboardManager';
import {
  onVerticalScroll,
  swipeStarted,
  swipeEnded
} from './actions';

@connect(state => ({
  // data
  books: state.books.ids.map(bookId => state.books.byId[bookId]),
  // ui state
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
       <Book
        key={book.id}
        bookId={book.id}
       />
    );

    let keyboardAvoidingView = null;
    let floatEditBar = null;
    let todayButton = null;
    if (isKeyboardShow) {
      keyboardAvoidingView = <View style={{height: keyboardHeight}} />;
      floatEditBar = <FloatEditBar keyboardHeight={keyboardHeight}/>;
    } else {
      todayButton = <TodayButton />;
    }

    return (
      <View>
        <ScrollView
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          ref={ref => {this.scrollView = ref}}
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
        {floatEditBar}
        {todayButton}
        <KeyboardManager verticalScrollTo={this.verticalScrollTo}/>
      </View>
    );
  }
}
