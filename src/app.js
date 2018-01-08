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
import KeyboardAvoidingView from './components/KeyboardAvoidingView';
import TodayButton from './components/TodayButton';
import KeyboardManager from './components/KeyboardManager';
import {
  setIsTouchMoving,
  setScrollY
} from './actions';

@connect(state => ({
  bookIds: state.books.ids,
}), {
  onTouchMove: () => setIsTouchMoving(true),
  onTouchEnd: () => setIsTouchMoving(false),
  setScrollY
})
export default class OnigiriNote extends Component {
  onScroll = (event) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  }

  verticalScrollTo = y => this.scrollView.scrollTo({y})

  render() {
    const {
      bookIds,
      onTouchMove,
      onTouchEnd
    } = this.props;

    const bookViews = bookIds.map(bookId =>
       <Book
        key={bookId}
        bookId={bookId}
       />
    );

    return (
      <View>
        <ScrollView
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          ref={ref => {this.scrollView = ref}}
          keyboardShouldPersistTaps={'always'}
          scrollEventThrottle={16}

          // Event Handlers
          onScroll={this.onScroll}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {bookViews}
          <StatusBar hidden />
          <KeyboardAvoidingView />
        </ScrollView>
        <FloatEditBar />
        <TodayButton />
        <KeyboardManager verticalScrollTo={this.verticalScrollTo} />
      </View>
    );
  }
}
