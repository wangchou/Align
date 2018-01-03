import React, { Component } from 'react';
import {
  Keyboard,
  Dimensions,
} from 'react-native';
import {
  keyboardWillShow,
  keyboardWillHide,
} from '../actions';

const windowHeight = Dimensions.get('window').height;

global.focusedInputPY = 0; // PageY
global.focusedInputOY = 0; // Relative Y to the parent of textInput
global.focusedInputHeight = 0;

export default class KeyboardManager extends Component {
  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      const keyboardHeight = event.endCoordinates.height;
      this.props.onKeyboardWillShow(keyboardHeight);
    });

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.props.onKeyboardWillHide);

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      if(focusedInputPY === 0) return;

      const inputY = this.props.scrollY + focusedInputPY - focusedInputOY;
      const alignInputBottomToKeyboardY = inputY + (focusedInputHeight - windowHeight + this.props.keyboardHeight)
      const isInputTopNotInView = focusedInputPY < 0;
      const isInputBottomCoverByKeyboard = (focusedInputPY + focusedInputHeight + this.props.keyboardHeight) > windowHeight;
      if(isInputTopNotInView) {
        this.props.verticalScrollTo(inputY);
      } else if(isInputBottomCoverByKeyboard){
        this.props.verticalScrollTo(alignInputBottomToKeyboardY);
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
    return null;
  }
}
