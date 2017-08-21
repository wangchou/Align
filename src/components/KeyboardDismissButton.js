import React, { Component } from 'react';
import FloatButton from './FloatButton';
import { Keyboard } from 'react-native';

export default class KeyboardDimissButton extends Component {
  render() {
    return (
      <FloatButton
        text={'v'}
        color={'#ff5722'}
        underColor={'#ff7043'}
        onPress={Keyboard.dismiss}
        bottom={this.props.keyboardHeight + 10}
      />
    );
  }
}
