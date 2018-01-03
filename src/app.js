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
  swipeStarted,
  swipeEnded
})
export default class OnigiriNote extends Component {
  constructor(){
    super();
    this.state = {
      scrollY: 0,
      isKeyboardShow: false,
      keyboardHeight: 0
    };
  }

  onScroll = (event) => {
    this.setState({scrollY: event.nativeEvent.contentOffset.y});
  }

  onKeyboardWillShow = (height) => {
    this.setState({keyboardHeight: height, isKeyboardShow: true});
  }

  onKeyboardWillHide = () => {
    this.setState({isKeyboardShow: false});
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
    const {isKeyboardShow, keyboardHeight, scrollY} = this.state;
    const bookViews = this.props.books.map(book =>
       <Book
        key={book.id}
        bookId={book.id}
        isKeyboardShow={isKeyboardShow}
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
        <KeyboardManager
          isKeyboardShow={isKeyboardShow}
          keyboardHeight={keyboardHeight}
          onKeyboardWillShow={this.onKeyboardWillShow}
          onKeyboardWillHide={this.onKeyboardWillHide}
          scrollY={scrollY}
          verticalScrollTo={this.verticalScrollTo}
        />
      </View>
    );
  }
}
