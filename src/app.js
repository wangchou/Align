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
  setIsTouchMoving
} from './actions';

@connect(state => ({
  bookIds: state.books.ids,
  isTouchMoving: state.ui.isTouchMoving,
}), {
  setIsTouchMoving
})
export default class OnigiriNote extends Component {
  constructor(props){
    super(props);
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

  render() {
    const {isKeyboardShow, keyboardHeight, scrollY} = this.state;
    const {bookIds, setIsTouchMoving} = this.props;

    const bookViews = bookIds.map(bookId =>
       <Book
        key={bookId}
        bookId={bookId}
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
          onTouchMove={() => setIsTouchMoving(true)}
          onTouchEnd={() => setIsTouchMoving(false)}
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
