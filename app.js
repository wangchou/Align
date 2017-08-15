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

global.isOnSwipe = false;
global.focusedInputPY = 0;
global.focusedInputOY = 0;
global.focusedInputHeight = 0;

const windowHeight = Dimensions.get('window').height;

@connect(state => ({
  bookModels: state.books.bookshelfIds.map(bookId => state.books.byId[bookId])
}))
export default class OnigiriNote extends Component {
  constructor(props) {
    super(props);
    this.state = {isKeyboardShow: false};
  }

  componentDidMount() {
    this.scrollY = 0;
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      if(!this.state.isKeyboardShow && isOnSwipe) {
        Keyboard.dismiss();
      } else {
        const keyboardHeight = event.endCoordinates.height;
        this.setState({isKeyboardShow: true, keyboardHeight});
      }
    });

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (event) => {
      this.setState({isKeyboardShow: false});
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      if(focusedInputPY === 0) return;

      const inputY = this.scrollY + focusedInputPY - focusedInputOY;
      const alignInputBottomToKeyboardY = inputY + (focusedInputHeight - windowHeight + this.state.keyboardHeight)
      const isInputTopInView = focusedInputPY < 0;
      const isInputBottomCoverByKeyboard = focusedInputPY + focusedInputHeight + this.state.keyboardHeight > windowHeight;
      if(isInputTopInView) {
        this.scrollView.scrollTo({y: inputY});
      } else if(isInputBottomCoverByKeyboard){
        this.scrollView.scrollTo({y: alignInputBottomToKeyboardY});
      }

      focusedInputPY = 0;
    });
  }

  componentWillUnmount() {
    this.keyboardWillHideListener.remove();
    this.keyboardWillShowListener.remove();
    this.keyboardDidShowListener.remove();
  }

  render() {
    return (
      <View>
        <ScrollView
          ref={(scrollView) => {this.scrollView = scrollView}}
          style={{backgroundColor: 'rgba(155, 155, 155, 0.1)'}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          scrollEventThrottle={50}
          onScroll={e => {this.scrollY = e.nativeEvent.contentOffset.y}}
        >
          <StatusBar hidden />
          {this.props.bookModels.map(
            bookModel => <BookSwipeContainer
                          key={bookModel.id}
                          bookModel={bookModel}
                         />
          )}
          {this.state.isKeyboardShow ? <View style={{height: this.state.keyboardHeight}} /> : null}
        </ScrollView>
        {this.state.isKeyboardShow ?
          <KeyboardDimissButton keyboardHeight={this.state.keyboardHeight}/> :
          null
        }
      </View>
    );
  }
}
