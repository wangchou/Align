import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Keyboard,
  Dimensions,
} from 'react-native';
import {
  keyboardWillShow,
  keyboardWillHide,
} from '../actions/ui';

const windowHeight = Dimensions.get('window').height;


/*
 * KeyboardManager doing two things
 * 1. make sure keyboard not show when swiping textInput
 * 2. make keyboard avoiding focused textInput and show keyboard dismiss button
 *    when keyboard shows
 */

global.focusedInputPY = 0; // PageY
global.focusedInputOY = 0; // Relative Y to the parent of textInput
global.focusedInputHeight = 0;

@connect(state => ({
  isKeyboardShow: state.ui.keyboard.isKeyboardShow,
  isKeyboardShown: state.ui.keyboard.isKeyboardShown,
  keyboardHeight: state.ui.keyboard.keyboardHeight,
  scrollY: state.ui.scrollY,
  isOnSwipe: state.ui.isOnSwipe
}), {
  keyboardWillShow,
  keyboardWillHide,
})
export default class KeyboardManager extends Component {
  componentDidMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      // do not dismiss keyboard after keyboard show up
      if(!this.props.isKeyboardShow && this.props.isOnSwipe) {
        Keyboard.dismiss();
      } else {
        const keyboardHeight = event.endCoordinates.height;
        this.props.keyboardWillShow(keyboardHeight);
        // cannot doing the keyboard scroll here
        // because not knowing which textInput is focused
      }
    });

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.props.keyboardWillHide);

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
