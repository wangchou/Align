import React, { Component } from 'react';
import {
  Keyboard,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
  setKeyboardHeight,
  setIsKeyboardShow
} from '../actions';


const windowHeight = Dimensions.get('window').height;

global.focusedInputPY = 0; // PageY
global.focusedInputHeight = 0;

@connect(state => ({
  isKeyboardShow: state.ui.isKeyboardShow,
  keyboardHeight: state.ui.keyboardHeight,
  scrollY: state.ui.scrollY
}), {
  setKeyboardHeight,
  setIsKeyboardShow
})
export default class KeyboardManager extends Component {
  componentDidMount() {
    this.props.setIsKeyboardShow(false);

    this.keyboardWillShowListerner = Keyboard.addListener('keyboardWillShow', (event) => {
      console.log("keyboardWillShow");
      // adding keyboard avoiding view before keyboard showed
      const keyboardHeight = event.endCoordinates.height;
      this.props.setKeyboardHeight(keyboardHeight);
      this.props.setIsKeyboardShow(true);
    });
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', ()=>{
      this.props.setIsKeyboardShow(false);
    });

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      if(focusedInputPY === 0) {
        console.log("return");
        return;
      }

      const keyboardHeight = event.endCoordinates.height;
      const windowHeightWithKeboard = windowHeight - keyboardHeight;
      const inputY = this.props.scrollY + focusedInputPY;
      console.log(`scrollY: ${this.props.scrollY}, focusedInputPY:${focusedInputPY}, inputY:${inputY}, keyboardHeight:${keyboardHeight}`);
      const alignInputBottomToKeyboardY = inputY + (focusedInputHeight - windowHeight + keyboardHeight)
      const isInputTopNotInView = focusedInputPY < 0;
      const isInputBottomCoverByKeyboard = (focusedInputPY + focusedInputHeight + keyboardHeight) > windowHeight;
      if(isInputTopNotInView) {
        // this.props.verticalScrollTo(inputY);
      } else if(isInputBottomCoverByKeyboard) {
        // this.props.verticalScrollTo(alignInputBottomToKeyboardY);
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
